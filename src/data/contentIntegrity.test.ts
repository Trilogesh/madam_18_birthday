import test from 'node:test';
import assert from 'node:assert/strict';
import { POEMS } from './poems.js';
import { DISCOVERIES } from './discoveries.js';
import { CHAMBER_LETTERS, FINAL_REVEAL_CONTENT } from './letters.js';

test('Poem I has 5 stanzas and contains approved verses', () => {
  const poem1 = POEMS[0];
  assert.equal(poem1.stanzas.length, 5);
  assert.ok(poem1.stanzas[0].includes('There is a grace in thy presence, dear'));
  assert.ok(poem1.stanzas[1].includes('And oh, thy hair, those lovely strands'));
  assert.ok(poem1.stanzas[4].includes('It is your presence I long to relive'));
});

test('Poem II has 6 stanzas and contains approved verses', () => {
  const poem2 = POEMS[1];
  assert.equal(poem2.stanzas.length, 6);
  assert.ok(poem2.stanzas[0].includes('Somehow, my heart fell far too deep'));
  assert.ok(poem2.stanzas[4].includes("I'll love you, Madamm, with my best"));
});

test('Poem III has 9 stanzas and retains tender vulnerability', () => {
  const poem3 = POEMS[2];
  assert.equal(poem3.stanzas.length, 9);
  assert.ok(poem3.stanzas[0].includes('In a world that teaches hearts to hide'));
  assert.ok(poem3.stanzas[8].includes('Order me, Madamm; tell me how'));
});

test('Poem IV has 14 stanzas and retains quiet depth', () => {
  const poem4 = POEMS[3];
  assert.ok(poem4.stanzas.length >= 14);
  assert.ok(poem4.stanzas[0].includes('There are some feelings words cannot hold'));
  assert.ok(poem4.stanzas[poem4.stanzas.length - 1].includes("I love you, Madamm—and I don't know how not to"));
});

test('Poem V contains the moon envy and signature line', () => {
  const poem5 = POEMS[4];
  assert.ok(poem5.stanzas.some((s) => s.includes('The moon may shine, but I have you')));
  assert.ok(poem5.stanzas.some((s) => s.includes('What beauty walks this earth in thee')));
});

test('Poem VI contains seasons changes and devotion', () => {
  const poem6 = POEMS[5];
  assert.ok(poem6.stanzas[0].includes('If time should change the world we know'));
  assert.ok(poem6.stanzas[poem6.stanzas.length - 1].includes("My dearest Madamm, I'll keep choosing you"));
});

test('Poem VII contains both the rose garden and the turning rose without blaming', () => {
  const poem7 = POEMS[6];
  assert.equal(poem7.stanzas.length, 2);
  assert.ok(poem7.stanzas[0].includes('build a spring where roses bloom anew'));
  assert.ok(poem7.stanzas[1].includes("I'll never blame its petals for the way they turn that way"));
  assert.ok(poem7.stanzas[1].includes('hope one day the rose discovers it needn\'t search the skies anymore'));
});

test('Page 2 Discovery 3 preserves personal voice and phrasing', () => {
  const d3 = DISCOVERIES.find((d) => d.id === 3);
  assert.ok(d3);
  assert.ok(d3.content.some((c) => c.includes('Even you are at that long from me in distance youh are the only one who made me feel closer than anybody else ik')));
});

test('Letter III contains moon story signal without claiming automated tracking', () => {
  const l3 = CHAMBER_LETTERS.find((l) => l.id === 3);
  assert.ok(l3);
  assert.ok(l3.paragraphs.some((p) => p.includes('post a little moon on your story')));
  assert.ok(l3.highlight?.includes('Different places, one sky, two hearts wishing they could close the distance'));
});

test('Letter V includes dream house, cars, R15 bike night rides, chocolate ice cream', () => {
  const l5 = CHAMBER_LETTERS.find((l) => l.id === 5);
  assert.ok(l5);
  assert.ok(l5.paragraphs.some((p) => p.includes('R15 bike waiting for our night rides')));
  assert.ok(l5.paragraphs.some((p) => p.includes('chocolate ice cream')));
  assert.ok(l5.paragraphs.some((p) => p.includes('dream house')));
  assert.ok(l5.signature.includes('Your future night-ride partner, chocolate-ice-cream thief, and hopeful co-dreamer'));
});

test('Final reveal has exact birthday greeting and closing line', () => {
  assert.equal(FINAL_REVEAL_CONTENT.birthdayGreeting, 'Happy Birthday, Madam Ji! ❤️🌙');
  assert.equal(FINAL_REVEAL_CONTENT.finalEndingLine, 'You are loved, Madamm.');
});
