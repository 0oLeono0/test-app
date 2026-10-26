# Phase 2 Research

Date: 2026-10-26. Inline source-grounded research; no independent agent claim.

## Approach
Add MatchFilter = all | upcoming | finished and filterMatches as a pure helper. Add three wrapping Russian controls Все / Предстоящие / Завершённые above FlatList with accessibilityRole button and accessibilityState selected. Keep selected filter in screen state. Derive filtered data without modifying the fetched array. Distinguish server-empty copy from filtered-empty copy Нет матчей по этому фильтру; switching back to All restores all records.

## Existing Patterns
Named functional components/hooks and StyleSheet.create; stable match IDs. Effects need cleanup; FlatList shallow props require selection state to reach renderItem/extraData. Current useFavorites has both index truthiness and mutation bugs; UpdatedAgo has stale closure, ignores since and lacks cleanup. Phase 1's request guard and timeout should remain effective through refresh extension.

## Validation Architecture
Before implementation add tests expecting fixture filter counts 8/3/3, preservation of IDs/order, unknown statuses only in All, empty subsets and no input mutation; observe RED then GREEN. Browser clicks prove the three counts, selected state, and empty filter recovery.

## Sources
README.md, AGENTS.md, phase-1 source and supplied fixture. Matching Expo docs https://docs.expo.dev/versions/v57.0.0/ and https://docs.expo.dev/llms.txt fetched; consulted https://reactnative.dev/docs/0.86/flatlist, https://reactnative.dev/docs/0.86/pressable and https://react.dev/reference/react/useEffect. Do not introduce a forced timezone or application fixture fallback.

