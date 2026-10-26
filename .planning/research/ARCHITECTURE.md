# Architecture Research

**Date:** 2026-10-26
**Confidence:** High for source findings; suggested boundaries remain implementation choices.

## Existing Boundaries

App.tsx mounts MatchesScreen without routing. src/config.ts owns MATCHES_URL. FavoriteButton is a presentational control with active/onPress props. useFavorites owns in-memory match IDs. UpdatedAgo accepts the last-success Date. No match domain types or fetching hook currently exist.

## Suggested Data Flow

MATCHES_URL → HTTP response/status check → JSON envelope { round, matches } → typed matches → selected filter → match cards. Keep the request state and latest successful timestamp at the screen level or in a small focused hook if that improves clarity. Keep pure status/filter/date presentation helpers separate only when that makes the code easier to understand.

Screen owns one useFavorites instance shared across cards. Each card passes its stable match ID to the hook and a boolean to FavoriteButton. New array references and functional state updates make toggles visible and safe under rapid interaction. Ensure a FlatList sees favorite changes if used: its shallow-prop behavior must not conceal updates.

Refresh reuses the same request path. Advance the timestamp only after successful loading. Prevent overlapping responses from overwriting newer data; clean up work on unmount. UpdatedAgo measures wall-clock elapsed seconds from since, re-synchronizes when since changes, and clears its interval.

## Build Order

1. End-to-end remote load, card rendering, and initial request states.
2. Status filters over the displayed matches.
3. Correct favorite behavior integrated with cards and filters.
4. Refresh lifecycle and elapsed-time behavior.
5. Combined verification and truthful SOLUTION.md.

These are user capabilities, not isolated data/API/UI layers. Reuse existing contracts.

## Sources

- App.tsx, src/screens/MatchesScreen.tsx, src/config.ts, src/hooks/useFavorites.ts, src/components/*.tsx.
- [React immutable array updates](https://react.dev/learn/updating-arrays-in-state).
- [React effects and cleanup](https://react.dev/reference/react/useEffect).
- [React Native FlatList](https://reactnative.dev/docs/flatlist) — consult the 0.86 version before writing API-dependent code.
