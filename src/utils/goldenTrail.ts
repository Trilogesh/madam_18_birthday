export interface TrailPoint {
  x: number;
  y: number;
  age: number;
  maxAge: number;
}

export interface StardustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

export const GOLDEN_PALETTE = [
  '#fde68a', // light starlight gold
  '#fbbf24', // radiant amber
  '#f59e0b', // deep gold
  '#fef08a', // soft warm pale gold
  '#fffbeb', // ivory white highlight
];

export function createStardustParticle(x: number, y: number): StardustParticle {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 0.8 + 0.2;
  const colorIndex = Math.floor(Math.random() * GOLDEN_PALETTE.length);

  return {
    x: x + (Math.random() * 8 - 4),
    y: y + (Math.random() * 8 - 4),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 0.3, // slight upward float
    size: Math.random() * 1.8 + 0.8,
    alpha: Math.random() * 0.3 + 0.7,
    decay: Math.random() * 0.02 + 0.018,
    color: GOLDEN_PALETTE[colorIndex],
  };
}

export function updateParticles(particles: StardustParticle[]): StardustParticle[] {
  const active: StardustParticle[] = [];
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.98;
    p.vy *= 0.98;
    p.alpha -= p.decay;

    if (p.alpha > 0.01) {
      active.push(p);
    }
  }
  return active;
}

export function updateTrailPoints(points: TrailPoint[]): TrailPoint[] {
  const active: TrailPoint[] = [];
  for (let i = 0; i < points.length; i++) {
    const pt = points[i];
    pt.age += 1;
    if (pt.age < pt.maxAge) {
      active.push(pt);
    }
  }
  return active;
}
