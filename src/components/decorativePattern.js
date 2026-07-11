const PALETTE = { navy: '#0F1B4C', gold: '#D4A017', wine: '#9C1F2E', olive: '#2D4A2B' };

const toDataUri = svg => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const ribbonSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='5' viewBox='0 0 160 5'>
  <polygon points='8,5 13,0 18,5' fill='${PALETTE.navy}'/>
  <circle cx='40' cy='2.5' r='2.2' fill='${PALETTE.gold}'/>
  <ellipse cx='72' cy='2.5' rx='4.5' ry='1.9' fill='${PALETTE.wine}' transform='rotate(45 72 2.5)'/>
  <polygon points='104,0 109,5 114,0' fill='${PALETTE.olive}'/>
  <circle cx='136' cy='2.5' r='1.8' fill='${PALETTE.navy}'/>
  <ellipse cx='152' cy='2.5' rx='3' ry='1.4' fill='${PALETTE.gold}' transform='rotate(-40 152 2.5)'/>
</svg>`;

const navSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='150' height='74' viewBox='0 0 150 74'>
  <polygon points='16,14 24,2 32,14' fill='${PALETTE.gold}'/>
  <circle cx='22' cy='38' r='7' fill='${PALETTE.navy}'/>
  <ellipse cx='20' cy='60' rx='10' ry='4.4' fill='${PALETTE.wine}' transform='rotate(35 20 60)'/>
  <polygon points='118,62 129,74 140,62' fill='${PALETTE.olive}'/>
  <circle cx='128' cy='36' r='6' fill='${PALETTE.gold}'/>
  <ellipse cx='126' cy='12' rx='9' ry='3.8' fill='${PALETTE.navy}' transform='rotate(-30 126 12)'/>
</svg>`;

export const ribbonPatternUri = toDataUri(ribbonSvg);
export const navPatternUri = toDataUri(navSvg);
