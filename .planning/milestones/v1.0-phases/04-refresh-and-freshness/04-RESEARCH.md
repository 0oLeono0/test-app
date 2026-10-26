# Phase 4 Research

Date: 2026-10-26. Inline source-grounded research; no independent agent claim.

## Approach
Extend useMatches state to retain successful data during refresh with refreshing/error and updatedAt. Keep initial loading/error branches. A refresh synchronously locks against duplicate requests and uses the same validated HTTP path; cleanup cancels stale work. Success records a new Date; refresh failure keeps previous data and timestamp, renders an inline error and retry. UpdatedAgo computes seconds from Date.now()-since.getTime(), clamps at zero, updates from wall clock each second, responds to new since immediately and clears interval on cleanup. Button is disabled while refreshing with copy Обновление…. Keep deadline recoverable. Preserve initial empty-state behavior and existing retry API.

## Existing Patterns
Named functional components/hooks and StyleSheet.create; stable match IDs. Effects need cleanup; FlatList shallow props require selection state to reach renderItem/extraData. Current useFavorites has both index truthiness and mutation bugs; UpdatedAgo has stale closure, ignores since and lacks cleanup. Phase 1's request guard and timeout should remain effective through refresh extension.

## Validation Architecture
Browser verify RED before fix: no refresh control/elapsed label. GREEN: pending refresh keeps cards, button disables, elapsed age progresses beyond one second, successful response resets age, failed refresh keeps existing cards and increasing age then retry recovers. Use browser clock jump to detect counting-ticks drift. Filter/favorite state survives successful and failed refresh. Inspect interval cleanup.

## Sources
README.md, AGENTS.md, phase-1 source and supplied fixture. Matching Expo docs https://docs.expo.dev/versions/v57.0.0/ and https://docs.expo.dev/llms.txt fetched; consulted https://reactnative.dev/docs/0.86/flatlist, https://reactnative.dev/docs/0.86/pressable and https://react.dev/reference/react/useEffect. Do not introduce a forced timezone or application fixture fallback.

