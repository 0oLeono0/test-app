export type Team = { id: string; name: string };
export type Score = { home: number; away: number };
export type Match = {
  id: string;
  startsAt: string | null;
  status: string;
  home: Team;
  away: Team;
  score: Score | null;
};
export type MatchesResponse = { round: number; matches: Match[] };
export type MatchFilter = 'all' | 'upcoming' | 'finished';

export function filterMatches(matches: Match[], filter: MatchFilter): Match[] {
  if (filter === 'all') return matches;
  return matches.filter((match) => match.status === (filter === 'upcoming' ? 'scheduled' : 'finished'));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isTeam(value: unknown): value is Team {
  return isRecord(value) && isText(value.id) && isText(value.name);
}

function isScoreValue(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

function isMatch(value: unknown): value is Match {
  if (!isRecord(value)) return false;
  const { startsAt, score } = value;
  return isText(value.id) && isText(value.status) && isTeam(value.home) && isTeam(value.away)
    && (startsAt === null || (isText(startsAt) && Number.isFinite(Date.parse(startsAt))))
    && (score === null || (isRecord(score) && isScoreValue(score.home) && isScoreValue(score.away)));
}

// Validate at the network boundary so malformed data cannot masquerade as an empty round.
export function parseMatchesResponse(value: unknown): MatchesResponse {
  if (!isRecord(value) || !isScoreValue(value.round) || value.round === 0
    || !Array.isArray(value.matches) || !value.matches.every(isMatch)) {
    throw new Error('Некорректный ответ сервера');
  }
  const matches = value.matches;
  if (new Set(matches.map((match) => match.id)).size !== matches.length) {
    throw new Error('Повторяющиеся идентификаторы матчей');
  }
  return { round: value.round, matches };
}

export function formatScore(score: Score | null): string {
  return score === null ? 'Счёт пока неизвестен' : `${score.home} : ${score.away}`;
}

export function formatKickoff(startsAt: string | null): string {
  if (startsAt === null || !Number.isFinite(Date.parse(startsAt))) {
    return 'Дата и время уточняются';
  }
  return new Date(startsAt).toLocaleString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'scheduled': return 'Предстоящий';
    case 'finished': return 'Завершён';
    case 'live': return 'В прямом эфире';
    case 'postponed': return 'Перенесён';
    default: return 'Статус неизвестен';
  }
}
