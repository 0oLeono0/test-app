# Phase 1 Pattern Map

Inline mapping, 2026-10-26. Existing files checked directly; proposed paths are new tracked-source candidates.

| Target | Closest analog | Reuse |
|--------|----------------|-------|
| src/screens/MatchesScreen.tsx | Existing MatchesScreen | Named export, StyleSheet.create, flex 1, padding 16, title 24/700 |
| src/components/MatchCard.tsx | FavoriteButton.tsx | Typed props and named component export; presentational component |
| src/hooks/useMatches.ts | useFavorites.ts | Named hook; React state, but do not copy its mutation bugs |
| src/matches.ts | data/matches.json | Match IDs, null kickoff/score, home/away shape, round envelope |
| tests/matches.test.mjs | No existing test analog | Built-in node:test; pure domain tests without runtime dependency |

Concrete source patterns: `export function MatchesScreen()`, `StyleSheet.create`, `type Props = { active: boolean; onPress: () => void; }`. Keep the screen/data/component boundary small. Configuration remains imported from src/config.ts; the data fixture is test-only.
