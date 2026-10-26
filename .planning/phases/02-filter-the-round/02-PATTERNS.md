# Phase 2 Pattern Map

Targets: src/matches.ts, src/screens/MatchesScreen.tsx, tests/matches.test.mjs.
Existing screen uses explicit request state and named hooks. MatchCard accepts a Match; FavoriteButton accepts active/onPress; UpdatedAgo accepts since Date. Follow StyleSheet.create and Russian accessible copy. New helpers are defined and exported by this phase; existing names checked in source. Do not copy mutable state patterns from the buggy hook.

