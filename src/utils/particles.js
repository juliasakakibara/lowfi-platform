export function spawnCoinBurst(k, pos) {
  const colors = [
    [255, 215, 0],
    [255, 180, 50],
    [255, 240, 100],
  ];

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const speed = 80 + Math.random() * 60;
    const color = colors[i % colors.length];

    k.add([
      k.pos(pos),
      k.sprite("particle"),
      k.color(...color),
      k.scale(0.6 + Math.random() * 0.4),
      k.anchor("center"),
      k.z(20),
      k.lifespan(0.4, { fade: 0.2 }),
      {
        vel: k.vec2(Math.cos(angle) * speed, Math.sin(angle) * speed - 40),
      },
    ]).onUpdate(function () {
      this.pos.x += this.vel.x * k.dt();
      this.pos.y += this.vel.y * k.dt();
      this.vel.y += 200 * k.dt();
    });
  }
}

export function spawnStompDust(k, pos) {
  for (let i = 0; i < 5; i++) {
    k.add([
      k.pos(pos.x + (Math.random() - 0.5) * 20, pos.y),
      k.sprite("particle"),
      k.color(220, 220, 210),
      k.scale(0.8),
      k.anchor("center"),
      k.z(15),
      k.opacity(0.8),
      k.lifespan(0.35, { fade: 0.2 }),
      {
        vel: k.vec2((Math.random() - 0.5) * 100, -60 - Math.random() * 40),
      },
    ]).onUpdate(function () {
      this.pos.x += this.vel.x * k.dt();
      this.pos.y += this.vel.y * k.dt();
      this.vel.y += 150 * k.dt();
    });
  }
}

export function spawnConfetti(k, width, height, duration = 3) {
  const colors = [
    [255, 100, 120],
    [255, 200, 80],
    [100, 200, 255],
    [180, 120, 255],
    [120, 220, 120],
  ];

  let elapsed = 0;
  let accumulator = 0;

  const spawner = k.onUpdate(() => {
    elapsed += k.dt();
    accumulator += k.dt();

    if (elapsed >= duration) {
      spawner.cancel();
      return;
    }

    while (accumulator >= 0.08) {
      accumulator -= 0.08;
      for (let i = 0; i < 3; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        k.add([
          k.pos(Math.random() * width, -10),
          k.rect(6, 10),
          k.color(...color),
          k.anchor("center"),
          k.fixed(),
          k.z(200),
          k.lifespan(2.5, { fade: 0.5 }),
          {
            vel: k.vec2((Math.random() - 0.5) * 60, 80 + Math.random() * 60),
            spin: (Math.random() - 0.5) * 200,
          },
        ]).onUpdate(function () {
          this.pos.x += this.vel.x * k.dt();
          this.pos.y += this.vel.y * k.dt();
          this.angle += this.spin * k.dt();
          this.vel.y += 30 * k.dt();
        });
      }
    }
  });
}
