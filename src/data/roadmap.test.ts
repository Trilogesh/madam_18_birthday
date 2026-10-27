import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ROADMAP_PAGES,
  ACTIVE_PAGE_IDS,
  getNextPageId,
  getPrevPageId,
  getPageDefinition,
} from './roadmap.js';
import { POEMS } from './poems.js';
import { DISCOVERIES } from './discoveries.js';
import { CHAMBER_LETTERS, FINAL_REVEAL_CONTENT } from './letters.js';

test('roadmap preserves original 6-page roadmap and titles', () => {
  assert.equal(ROADMAP_PAGES.length, 6);
  assert.equal(ROADMAP_PAGES[0].title, 'A place that exists because of you');
  assert.equal(ROADMAP_PAGES[1].title, 'The things about her that the world might overlook');
  assert.equal(ROADMAP_PAGES[2].title, 'A personal poem collection');
  assert.equal(ROADMAP_PAGES[3].title, 'A museum of your memories');
  assert.equal(ROADMAP_PAGES[4].title, 'A secret room containing letters');
  assert.equal(ROADMAP_PAGES[5].title, 'The final reveal');
});

test('page 4 is explicitly marked as skipped and active pages exclude page 4', () => {
  const page4 = getPageDefinition(4);
  assert.ok(page4);
  assert.equal(page4.isSkipped, true);
  assert.deepEqual(ACTIVE_PAGE_IDS, [1, 2, 3, 5, 6]);
});

test('page transitions correctly jump over page 4', () => {
  assert.equal(getNextPageId(1), 2);
  assert.equal(getNextPageId(2), 3);
  assert.equal(getNextPageId(3), 5); // Page 4 is strictly skipped!
  assert.equal(getNextPageId(5), 6);
  assert.equal(getNextPageId(6), null);

  assert.equal(getPrevPageId(6), 5);
  assert.equal(getPrevPageId(5), 3); // Page 4 is strictly skipped backwards too!
  assert.equal(getPrevPageId(3), 2);
  assert.equal(getPrevPageId(2), 1);
  assert.equal(getPrevPageId(1), null);
});

test('exactly 7 approved poems exist and Poem VII has 2 paragraphs', () => {
  assert.equal(POEMS.length, 7);
  const poem7 = POEMS[6];
  assert.equal(poem7.title, 'WHERE THE ROSES TURN');
  assert.equal(poem7.stanzas.length, 2);
  assert.ok(poem7.stanzas[0].includes('My Madamm, if I could choose a place for you'));
  assert.ok(poem7.stanzas[1].includes('And if a rose still dreams of sunlight'));
});

test('page 2 has exactly 7 discoveries and includes food care', () => {
  assert.equal(DISCOVERIES.length, 7);
  const foodCare = DISCOVERIES.find((d) => d.id === 6);
  assert.ok(foodCare);
  assert.equal(foodCare.title, 'The Questions That Meant Everything');
  assert.ok(foodCare.content.some((line) => line.includes('check whether I\'ve eaten')));
});

test('page 5 has exactly 5 letters and page 6 final reveal has exact greetings', () => {
  assert.equal(CHAMBER_LETTERS.length, 5);
  assert.equal(FINAL_REVEAL_CONTENT.birthdayGreeting, 'Happy Birthday, Madam Ji! ❤️🌙');
  assert.equal(FINAL_REVEAL_CONTENT.finalEndingLine, 'You are loved, Madamm.');
});
