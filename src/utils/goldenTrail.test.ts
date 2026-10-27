import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createStardustParticle,
  updateParticles,
  updateTrailPoints,
  GOLDEN_PALETTE,
  StardustParticle,
  TrailPoint,
} from './goldenTrail.js';

test('createStardustParticle creates particle near cursor with golden color', () => {
  const p = createStardustParticle(100, 200);
  assert.ok(Math.abs(p.x - 100) <= 8);
  assert.ok(Math.abs(p.y - 200) <= 8);
  assert.ok(p.size >= 0.8 && p.size <= 2.8);
  assert.ok(p.alpha > 0.6 && p.alpha <= 1.0);
  assert.ok(GOLDEN_PALETTE.includes(p.color));
});

test('updateParticles decays alpha and prunes dead particles', () => {
  const p1: StardustParticle = {
    x: 50,
    y: 50,
    vx: 1,
    vy: -1,
    size: 2,
    alpha: 0.5,
    decay: 0.1,
    color: '#fbbf24',
  };
  const p2: StardustParticle = {
    x: 100,
    y: 100,
    vx: 0,
    vy: 0,
    size: 1,
    alpha: 0.05,
    decay: 0.1,
    color: '#f59e0b',
  };

  const updated = updateParticles([p1, p2]);
  assert.equal(updated.length, 1);
  assert.equal(updated[0].alpha, 0.4);
  assert.equal(updated[0].x, 51);
});

test('updateTrailPoints increments age and removes expired points', () => {
  const pt1: TrailPoint = { x: 10, y: 10, age: 5, maxAge: 10 };
  const pt2: TrailPoint = { x: 20, y: 20, age: 9, maxAge: 10 };

  const updated = updateTrailPoints([pt1, pt2]);
  assert.equal(updated.length, 1);
  assert.equal(updated[0].age, 6);
});
