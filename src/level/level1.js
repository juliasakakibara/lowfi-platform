// Plataformas: { x, y, w } — colisão e visual usam os mesmos valores
// gap = next.x - (x + w)
export const level1 = {
  width: 3000,
  ground: [
    // end 700, gap 50
    { x: 0, y: 400, w: 700 },
    // end 1100, gap 50
    { x: 750, y: 400, w: 350 },
    // end 1340, gap 50
    { x: 1150, y: 350, w: 190 },
    // end 1690, gap 50
    { x: 1390, y: 400, w: 300 },
    // end 1910, gap 50
    { x: 1740, y: 320, w: 170 },
    // end 2210, gap 50
    { x: 1960, y: 400, w: 250 },
    // end 2450, gap 50
    { x: 2260, y: 360, w: 190 },
    // end 2900
    { x: 2500, y: 400, w: 400 },
  ],
  enemies: [
    { x: 300, patrol: [200, 480], y: 400 },
    { x: 880, patrol: [780, 1040], y: 400 },
    { x: 1200, patrol: [1160, 1320], y: 350 },
    { x: 1480, patrol: [1420, 1660], y: 400 },
    { x: 1780, patrol: [1750, 1890], y: 320 },
    { x: 2050, patrol: [1980, 2180], y: 400 },
    { x: 2320, patrol: [2270, 2430], y: 360 },
    { x: 2680, patrol: [2550, 2850], y: 400 },
  ],
  collectibles: [
    { x: 200, y: 360 },
    { x: 500, y: 360 },
    { x: 900, y: 360 },
    { x: 1220, y: 310 },
    { x: 1520, y: 360 },
    { x: 1800, y: 280 },
    { x: 2080, y: 360 },
    { x: 2340, y: 320 },
    { x: 2620, y: 360 },
    { x: 2800, y: 360 },
  ],
  flag: { x: 2850, y: 400 },
};
