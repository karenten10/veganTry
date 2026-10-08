"""Give flat illustrations a watercolor look and save them as WebP.

Usage: python3 watercolor.py <input_dir_of_png> <output_dir>
Needs numpy, scipy and Pillow.
"""
import os
import sys
import zlib

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter, gaussian_gradient_magnitude, map_coordinates


def noise(rng, shape, sigma):
    n = gaussian_filter(rng.standard_normal(shape), sigma, mode='reflect')
    return n / (np.abs(n).max() + 1e-9)


def warp(chans, rng, amp, sigma):
    h, w = chans[0].shape
    dx = noise(rng, (h, w), sigma) * amp
    dy = noise(rng, (h, w), sigma) * amp
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    coords = [yy + dy, xx + dx]
    return [map_coordinates(c, coords, order=1, mode='nearest') for c in chans]


def paint(src, dst, seed):
    arr = np.asarray(Image.open(src).convert('RGBA'), np.float32) / 255
    h, w, _ = arr.shape
    rng = np.random.default_rng(seed)
    a = arr[..., 3]
    pm = arr[..., :3] * a[..., None]  # premultiplied color

    # hand-drawn, slightly wobbly edges, then a soft pigment bleed
    chans = [pm[..., 0], pm[..., 1], pm[..., 2], a]
    chans = warp(chans, rng, 3.5, 14)
    chans = warp(chans, rng, 1.2, 4)
    chans = [gaussian_filter(c, 1.1) for c in chans]
    a = np.clip(chans[3], 0, 1)
    rgb = np.clip(np.stack(chans[:3], -1) / np.maximum(a[..., None], 1e-4), 0, 1)

    # pigment pools along edges
    over_white = rgb * a[..., None] + (1 - a[..., None])
    lum = over_white @ np.array([0.299, 0.587, 0.114], np.float32)
    edge = gaussian_gradient_magnitude(lum, 1.6) * 3.2 + gaussian_gradient_magnitude(a, 1.6) * 1.6
    edge = gaussian_filter(np.clip(edge, 0, 1), 1.0)
    rgb = rgb * (1 - 0.30 * edge[..., None])

    # blotchy wash, granulation, and a lighter, more transparent tone
    n1 = noise(rng, (h, w), 28)
    n2 = noise(rng, (h, w), 9)
    grain = gaussian_filter(rng.standard_normal((h, w)), 0.8)
    grain /= grain.std() + 1e-9
    rgb = rgb * (1 + 0.09 * n1[..., None] + 0.04 * n2[..., None]) * (1 + 0.025 * grain[..., None])
    rgb = 1 - (1 - np.clip(rgb, 0, 1)) * 0.93

    # soft, ragged paint wash behind the dish
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    d = np.sqrt(((xx - w * 0.5) / (w * 0.40)) ** 2 + ((yy - h * 0.52) / (h * 0.40)) ** 2)
    d = d + 0.28 * noise(rng, (h, w), 22) + 0.10 * noise(rng, (h, w), 8)
    rim = np.exp(-((d - 0.98) / 0.05) ** 2)
    wash_a = np.clip((1.0 - d) / 0.25, 0, 1) * 0.95
    wash_a = np.clip(wash_a + 0.18 * rim * (d < 1.15), 0, 1)
    mix = np.clip(0.5 + 0.9 * n2, 0, 1)[..., None]
    cream = np.array([0.99, 0.89, 0.68], np.float32)
    green = np.array([0.80, 0.91, 0.74], np.float32)
    wash = (cream * (1 - mix) + green * mix) * (1 + 0.05 * n1[..., None]) * (1 - 0.14 * rim[..., None])
    wash = np.clip(wash, 0, 1)

    out_a = a + wash_a * (1 - a)
    out_rgb = (rgb * a[..., None] + wash * (wash_a * (1 - a))[..., None]) / np.maximum(out_a[..., None], 1e-4)
    out = np.dstack([np.clip(out_rgb, 0, 1), out_a])
    Image.fromarray((out * 255).astype(np.uint8), 'RGBA').save(dst, 'WEBP', quality=84, method=6)


if __name__ == '__main__':
    src_dir, dst_dir = sys.argv[1], sys.argv[2]
    os.makedirs(dst_dir, exist_ok=True)
    for name in sorted(os.listdir(src_dir)):
        if name.endswith('.png'):
            key = name[:-4]
            paint(os.path.join(src_dir, name), os.path.join(dst_dir, key + '.webp'), zlib.crc32(key.encode()))
    print('done')
