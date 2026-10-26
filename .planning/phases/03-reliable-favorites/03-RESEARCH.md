# Phase 3 Research

Date: 2026-10-26. Inline source-grounded research; no independent agent claim.

## Approach
Replace Boolean(indexOf) membership with includes. Replace push/splice and same-reference setState with a functional updater returning filter(prev) or [...prev,id]. Integrate existing FavoriteButton into each MatchCard using active/onPress props. Keep useFavorites at screen scope and ensure FlatList rerenders on favorites changes via extraData. FavoriteButton retains Russian add/remove labels and gains selected accessibility state and a 44px touch target. Give each control an identifying accessible label including both teams.

## Existing Patterns
Named functional components/hooks and StyleSheet.create; stable match IDs. Effects need cleanup; FlatList shallow props require selection state to reach renderItem/extraData. Current useFavorites has both index truthiness and mutation bugs; UpdatedAgo has stale closure, ignores since and lacks cleanup. Phase 1's request guard and timeout should remain effective through refresh extension.

## Validation Architecture
Browser RED: verify current cards have no favorite controls. After integration verify all eight stars initially inactive, first favorite becomes active, another remains independent, rapid repeated toggles return expected parity, filter round-trip preserves selection. Recheck refresh preservation in Phase 4. Run domain suite and types.

## Sources
README.md, AGENTS.md, phase-1 source and supplied fixture. Matching Expo docs https://docs.expo.dev/versions/v57.0.0/ and https://docs.expo.dev/llms.txt fetched; consulted https://reactnative.dev/docs/0.86/flatlist, https://reactnative.dev/docs/0.86/pressable and https://react.dev/reference/react/useEffect. Do not introduce a forced timezone or application fixture fallback.

