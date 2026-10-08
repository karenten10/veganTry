// SVG sources for the dish illustrations (320x150 viewBox).
// render.js rasterizes these and watercolor.py gives them the painted look.
(function(){
  var RIM = '#D5DFCB';
  function svg(inner){ return '<svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid meet" focusable="false">' + inner + '</svg>'; }
  function shadow(){ return '<ellipse cx="160" cy="135" rx="100" ry="8" fill="#1D2A1F" opacity=".1"/>'; }
  function steam(){ return '<g fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"><path d="M138 54c-9-8 9-14 0-24"/><path d="M160 50c-9-8 9-14 0-24"/><path d="M182 54c-9-8 9-14 0-24"/></g>'; }
  function bowl(surface, band){
    return shadow() +
      '<path d="M70 80C70 120 108 136 160 136S250 120 250 80Z" fill="#fff" stroke="' + RIM + '" stroke-width="2"/>' +
      '<path d="M82 100c20 14 48 20 78 20s58-6 78-20" fill="none" stroke="' + band + '" stroke-width="5" stroke-linecap="round" opacity=".55"/>' +
      '<ellipse cx="160" cy="80" rx="90" ry="16" fill="' + surface + '" stroke="#fff" stroke-width="6"/>';
  }
  function plate(){
    return shadow() +
      '<ellipse cx="160" cy="104" rx="112" ry="30" fill="#fff" stroke="' + RIM + '" stroke-width="2"/>' +
      '<ellipse cx="160" cy="104" rx="86" ry="21" fill="#F1F5EA"/>';
  }
  function dots(color, r, pts){
    return pts.map(function(p){ return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" fill="' + color + '"/>'; }).join('');
  }
  function boxes(fill, stroke, w, h, rx, pts){
    return pts.map(function(p){ return '<rect x="' + p[0] + '" y="' + p[1] + '" width="' + w + '" height="' + h + '" rx="' + rx + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.5"/>'; }).join('');
  }
  function sushi(cx, cy){
    return '<ellipse cx="' + cx + '" cy="' + (cy + 8) + '" rx="22" ry="7" fill="#1D2A1F" opacity=".12"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="21" fill="#2B3B2E"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="17.5" fill="#FBFBF2"/>' +
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="9.5" ry="8.5" fill="#8DBB4A"/>' +
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="5" ry="4.5" fill="#CFE59A"/>' +
      '<circle cx="' + (cx - 8) + '" cy="' + (cy + 7) + '" r="3.6" fill="#4F9A4A"/>' +
      '<circle cx="' + (cx + 8) + '" cy="' + (cy + 6) + '" r="3.2" fill="#EE8A2E"/>';
  }
  function tomato(cx, cy, r){
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#DA4A39"/><circle cx="' + (cx - r / 3) + '" cy="' + (cy - r / 3) + '" r="' + (r / 4) + '" fill="#fff" opacity=".5"/>';
  }

  var ART = {
    sanbei: svg(shadow() +
      '<rect x="54" y="82" width="32" height="10" rx="5" fill="#5B3A22"/><rect x="234" y="82" width="32" height="10" rx="5" fill="#5B3A22"/>' +
      '<path d="M80 78C80 122 114 136 160 136S240 122 240 78Z" fill="#7A4B2C"/>' +
      '<path d="M92 104c18 12 42 18 68 18" fill="none" stroke="#A56B3F" stroke-width="5" stroke-linecap="round" opacity=".6"/>' +
      '<ellipse cx="160" cy="78" rx="82" ry="15" fill="#5B3A22" stroke="#8F5B38" stroke-width="6"/>' +
      '<ellipse cx="160" cy="78" rx="68" ry="10" fill="#3F2615"/>' +
      '<g fill="#F2DEB2" stroke="#D9B56E" stroke-width="2"><ellipse cx="128" cy="76" rx="15" ry="8"/><ellipse cx="160" cy="72" rx="15" ry="8"/><ellipse cx="192" cy="76" rx="15" ry="8"/><ellipse cx="144" cy="83" rx="15" ry="8"/><ellipse cx="176" cy="83" rx="15" ry="8"/></g>' +
      '<path d="M120 70c4-14 20-18 28-10-4 12-18 16-28 10z" fill="#4C9A4F"/><path d="M172 66c6-14 24-14 30-4-6 12-22 14-30 4z" fill="#3F8A45"/><path d="M148 84c4-10 16-12 22-6-4 9-14 11-22 6z" fill="#5AAE57"/>' +
      steam()),
    tomatoegg: svg(plate() +
      dots('#F7D154', 15, [[128, 100], [190, 98]]) + dots('#F7D154', 17, [[158, 94]]) + dots('#F7D154', 12, [[142, 109], [176, 111]]) +
      dots('#FBE58A', 6, [[124, 96], [154, 88], [186, 94], [140, 106], [174, 108]]) +
      '<path d="M94 106c6-16 26-18 36-8-8 14-24 18-36 8z" fill="#DA4A39"/><path d="M102 104c6-8 16-9 22-4-6 7-14 9-22 4z" fill="#EE7A63"/>' +
      '<path d="M206 98c10-12 28-8 32 4-12 10-26 10-32-4z" fill="#DA4A39"/><path d="M214 98c8-6 16-5 20 0-7 5-14 6-20 0z" fill="#EE7A63"/>' +
      '<path d="M150 120c8-8 24-8 30 0-8 8-22 8-30 0z" fill="#DA4A39"/>'),
    tofu: svg(plate() +
      '<g transform="rotate(-6 124 98)"><rect x="98" y="84" width="52" height="30" rx="7" fill="#E7B04F" stroke="#C98A2B" stroke-width="2"/><rect x="104" y="88" width="40" height="8" rx="4" fill="#F6D58A"/></g>' +
      '<g transform="rotate(5 196 98)"><rect x="170" y="84" width="52" height="30" rx="7" fill="#E7B04F" stroke="#C98A2B" stroke-width="2"/><rect x="176" y="88" width="40" height="8" rx="4" fill="#F6D58A"/></g>' +
      '<rect x="134" y="96" width="52" height="30" rx="7" fill="#E7B04F" stroke="#C98A2B" stroke-width="2"/><rect x="140" y="100" width="40" height="8" rx="4" fill="#F6D58A"/>' +
      '<path d="M104 92c10 6 22 6 34 0M176 92c10 6 22 6 34 0M140 108c10 6 22 6 34 0" fill="none" stroke="#6B3E1E" stroke-width="3" stroke-linecap="round"/>' +
      dots('#FFF6DD', 2.2, [[112, 90], [128, 96], [190, 88], [206, 96], [150, 112], [168, 116]]) +
      '<path d="M222 78c6-10 18-10 22-2-6 8-16 10-22 2z" fill="#4C9A4F"/><path d="M84 82c6-10 18-10 22-2-6 8-16 10-22 2z" fill="#3F8A45"/>'),
    pumpkin: svg(bowl('#F2A24B', '#F2A24B') +
      '<path d="M118 80c14-10 28-10 42 0s28 10 42 0" fill="none" stroke="#FFF3DC" stroke-width="5" stroke-linecap="round"/><path d="M136 75c8-4 16-4 24 0s16 4 24 0" fill="none" stroke="#FFF3DC" stroke-width="3" stroke-linecap="round"/>' +
      dots('#3A2A1A', 1.6, [[120, 74], [200, 86], [140, 88], [182, 70], [166, 90]]) +
      '<g fill="#F6E7C1" stroke="#D9B873" stroke-width="1.2"><ellipse cx="214" cy="76" rx="5" ry="3"/><ellipse cx="104" cy="82" rx="5" ry="3"/></g>' +
      steam()),
    mapo: svg(bowl('#D8512B', '#D8512B') +
      boxes('#FFF8E6', '#EBDDB8', 22, 15, 4, [[104, 68], [136, 62], [168, 66], [198, 68], [122, 78], [154, 76], [186, 80]]) +
      dots('#7B4A2A', 3, [[130, 84], [170, 88], [206, 82], [112, 84]]) + dots('#F2B24A', 1.8, [[150, 70], [190, 74], [124, 72]]) +
      steam()),
    danbing: svg(plate() +
      '<rect x="88" y="84" width="112" height="34" rx="17" fill="#EAC27A" stroke="#D3A456" stroke-width="2"/><path d="M106 93h76" stroke="#F6DDA0" stroke-width="5" stroke-linecap="round"/>' +
      '<ellipse cx="236" cy="108" rx="15" ry="17" fill="#F7E6B2" stroke="#D3A456" stroke-width="2"/><ellipse cx="236" cy="108" rx="9" ry="11" fill="#F2A93B"/>' +
      '<ellipse cx="214" cy="100" rx="16" ry="18" fill="#F7E6B2" stroke="#D3A456" stroke-width="2"/><ellipse cx="214" cy="100" rx="10" ry="12" fill="#F6C94A"/>' +
      dots('#8CC768', 2.4, [[210, 96], [218, 102], [212, 106], [217, 94]]) + dots('#F3C531', 2.2, [[236, 104], [234, 112]]) +
      '<ellipse cx="124" cy="126" rx="16" ry="5" fill="#7A4425"/>'),
    friedrice: svg(bowl('#FFF1D2', '#7BB661') +
      '<path d="M84 80C96 34 224 34 236 80Z" fill="#FFF4D8" stroke="#F0DDAF" stroke-width="2"/>' +
      dots('#F3C531', 4, [[130, 62], [162, 52], [190, 64], [146, 72], [210, 72], [116, 74]]) +
      dots('#6AB058', 4.5, [[146, 56], [176, 60], [200, 56], [126, 70], [170, 72]]) +
      boxes('#EE8A2E', '#EE8A2E', 8, 8, 2, [[134, 46], [182, 46], [114, 62], [198, 66], [156, 64]]) +
      steam()),
    miso: svg(bowl('#C8964B', '#8A5A33') +
      boxes('#FFFDF5', '#EADFC4', 20, 14, 3, [[116, 68], [150, 74], [186, 68], [134, 82]]) +
      '<path d="M170 82c8-6 14 2 22-2" fill="none" stroke="#2F6B3A" stroke-width="6" stroke-linecap="round"/><path d="M104 78c8-6 14 2 20-2" fill="none" stroke="#2F6B3A" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M200 80q10 6 20 0M120 88q10 5 20 0" fill="none" stroke="#F1E3BE" stroke-width="3" stroke-linecap="round"/>' +
      steam()),
    avosalad: svg(bowl('#7DBB5A', '#5E9E58') +
      '<ellipse cx="120" cy="70" rx="26" ry="14" fill="#5FA94F"/><ellipse cx="200" cy="70" rx="26" ry="14" fill="#4C9A4F"/><ellipse cx="160" cy="62" rx="30" ry="16" fill="#7DBB5A"/><ellipse cx="140" cy="76" rx="20" ry="10" fill="#8CC768"/><ellipse cx="182" cy="78" rx="20" ry="10" fill="#6BB052"/>' +
      '<ellipse cx="148" cy="62" rx="15" ry="19" fill="#7AA73A"/><ellipse cx="148" cy="62" rx="11" ry="15" fill="#E4EE9E"/><circle cx="148" cy="66" r="6" fill="#8A5A33"/>' +
      '<ellipse cx="192" cy="64" rx="12" ry="15" fill="#7AA73A"/><ellipse cx="192" cy="64" rx="8.5" ry="11.5" fill="#E4EE9E"/><circle cx="192" cy="67" r="4.5" fill="#8A5A33"/>' +
      tomato(122, 66, 9) + tomato(220, 72, 9) + tomato(170, 52, 8) +
      '<circle cx="136" cy="80" r="8" fill="#5E9E4F"/><circle cx="136" cy="80" r="5" fill="#DCEFC2"/><circle cx="184" cy="84" r="8" fill="#5E9E4F"/><circle cx="184" cy="84" r="5" fill="#DCEFC2"/>' +
      dots('#F3C531', 3, [[106, 78], [206, 84], [160, 86]])),
    avosushi: svg(plate() + sushi(112, 100) + sushi(160, 96) + sushi(208, 100) +
      '<ellipse cx="254" cy="94" rx="15" ry="6" fill="#3A2417"/><ellipse cx="240" cy="108" rx="7" ry="5" fill="#8DBB4A"/>'),
    douhua: svg(bowl('#FFF6E4', '#C9A66B') +
      '<ellipse cx="160" cy="82" rx="70" ry="11" fill="#8A5A2B" opacity=".85"/>' +
      '<path d="M108 80c10-14 26-14 32 0-8 7-24 7-32 0z" fill="#FFFDF5"/><path d="M146 76c10-14 26-14 32 0-8 7-24 7-32 0z" fill="#FFFDF5"/><path d="M184 80c10-14 26-14 32 0-8 7-24 7-32 0z" fill="#FFFDF5"/><path d="M126 86c10-10 24-10 30 0-8 6-22 6-30 0z" fill="#FFF6E4"/><path d="M164 86c10-10 24-10 30 0-8 6-22 6-30 0z" fill="#FFF6E4"/>' +
      '<g fill="#D9A25A" stroke="#B9843F" stroke-width="1"><ellipse cx="122" cy="70" rx="4.5" ry="3"/><ellipse cx="170" cy="68" rx="4.5" ry="3"/><ellipse cx="206" cy="72" rx="4.5" ry="3"/><ellipse cx="148" cy="88" rx="4.5" ry="3"/></g>' +
      '<circle cx="196" cy="88" r="5" fill="#F0D488" stroke="#C9A24A" stroke-width="1.2"/>' +
      steam()),
    hero: svg(bowl('#7DBB5A', '#E8902F') +
      '<rect x="116" y="58" width="9" height="20" rx="3" fill="#8DBB4A"/><circle cx="106" cy="52" r="12" fill="#3F8A45"/><circle cx="122" cy="44" r="13" fill="#4C9A4F"/><circle cx="138" cy="52" r="11" fill="#3F8A45"/>' +
      tomato(172, 58, 14) + '<path d="M164 46l8 6 8-6" fill="none" stroke="#3F8A45" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="204" cy="66" r="9" fill="#EE8A2E"/><circle cx="204" cy="66" r="4" fill="#F6B26B"/><circle cx="220" cy="76" r="8" fill="#EE8A2E"/><circle cx="220" cy="76" r="3.5" fill="#F6B26B"/>' +
      '<path d="M140 76c6-12 22-14 30-6-6 12-22 14-30 6z" fill="#5AAE57"/>')
  };
  module.exports = ART;
})();
