import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  formatKickoff,
  formatScore,
  getStatusLabel,
  parseMatchesResponse,
} from '../src/matches.ts';

const fixture = JSON.parse(readFileSync(new URL('../data/matches.json', import.meta.url), 'utf8'));

test('preserves all eight matches, their order, and nullable fixture values', () => {
  const result = parseMatchesResponse(fixture);
  assert.equal(result.round, 12);
  assert.deepEqual(result.matches.map(({ id }) => id), fixture.matches.map(({ id }) => id));
  assert.equal(result.matches[6].startsAt, null);
  assert.equal(result.matches[4].score, null);
});

test('renders a real zero score distinctly from a missing score', () => {
  assert.equal(formatScore({ home: 0, away: 0 }), '0 : 0');
  assert.equal(formatScore(null), 'Счёт пока неизвестен');
});

test('does not turn unknown kickoff into epoch time', () => {
  assert.equal(formatKickoff(null), 'Дата и время уточняются');
  assert.equal(formatKickoff('not-a-date'), 'Дата и время уточняются');
});

test('formats kickoff in device timezone rather than fixed UTC or Moscow', () => {
  const previous = process.env.TZ;
  try {
    process.env.TZ = 'America/New_York';
    assert.match(formatKickoff('2026-10-11T13:00:00Z'), /09:00/);
    process.env.TZ = 'Asia/Tokyo';
    assert.match(formatKickoff('2026-10-11T13:00:00Z'), /22:00/);
  } finally {
    if (previous === undefined) delete process.env.TZ;
    else process.env.TZ = previous;
  }
});

test('provides Russian labels for every supplied status and an unknown fallback', () => {
  assert.deepEqual(['scheduled', 'finished', 'live', 'postponed'].map(getStatusLabel),
    ['Предстоящий', 'Завершён', 'В прямом эфире', 'Перенесён']);
  assert.equal(getStatusLabel('unexpected'), 'Статус неизвестен');
});

test('accepts a genuine empty response and future status without hiding the match', () => {
  assert.deepEqual(parseMatchesResponse({ round: 12, matches: [] }), { round: 12, matches: [] });
  const future = structuredClone(fixture);
  future.matches[0].status = 'cancelled';
  assert.equal(parseMatchesResponse(future).matches.length, 8);
});

test('rejects malformed envelope and records instead of reporting empty success', () => {
  for (const bad of [null, [], {}, { round: 12 }, { round: 0, matches: [] }, { round: 12, matches: {} }]) {
    assert.throws(() => parseMatchesResponse(bad));
  }
  for (const patch of [
    { id: '' }, { home: null }, { away: { id: 'x' } }, { status: 42 },
    { startsAt: 'invalid-date' }, { score: { home: -1, away: 0 } },
    { score: { home: 0, away: null } }, { score: { home: 0.5, away: 1 } },
  ]) {
    const bad = structuredClone(fixture);
    Object.assign(bad.matches[0], patch);
    assert.throws(() => parseMatchesResponse(bad));
  }
});

test('rejects duplicate match IDs to protect stable list identity', () => {
  const duplicate = structuredClone(fixture);
  duplicate.matches[1].id = duplicate.matches[0].id;
  assert.throws(() => parseMatchesResponse(duplicate));
});
