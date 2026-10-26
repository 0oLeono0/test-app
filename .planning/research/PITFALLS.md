# Pitfalls Research

**Date:** 2026-10-26

| Pitfall / warning sign | Prevention | Phase |
|------------------------|------------|-------|
| OWNER/REPO is literal in MATCHES_URL; network success cannot be assumed | Preserve configuration instruction; obtain authoritative endpoint; use intercepted fixture responses only for explicitly labeled tests | 1, 5 |
| Truthiness hides 0–0 or null becomes an epoch kickoff | Test null explicitly; render zero scores; use a clear missing-time fallback | 1 |
| Using current date to classify old fixture dates | Filter by server status; live/postponed only in All; explain policy | 2 |
| Boolean(indexOf(id)) lights absent IDs (-1) and hides first ID (0) | Use includes or explicit index comparison; check first and absent IDs | 3 |
| push/splice plus same-reference setState can skip rendering | Functional immutable update; rapidly toggle one and several IDs | 3 |
| FlatList does not see favorite changes through shallow props | Ensure renderer/extraData communicates selected-state updates | 3 |
| Interval captures initial seconds; since is ignored | Derive elapsed seconds from wall clock and since; handle since changes | 4 |
| Interval survives unmount or drifts after background throttling | Clean up interval; measure elapsed time rather than counting ticks | 4 |
| Failed refresh falsely resets freshness or removes useful matches | Update timestamp only on success; preserve loaded data and show retryable error | 4 |
| Unsupported claims in SOLUTION.md | Describe actual causes/fixes, elapsed work, AI usage, checks and remaining blockers; never invent Expo Go validation | 5 |

## Sources

- Supplied source and fixture — concrete findings above.
- [React immutable array updates](https://react.dev/learn/updating-arrays-in-state).
- [React useEffect](https://react.dev/reference/react/useEffect) — dependencies, cleanup, and captured state.
- [Date.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) — local date formatting; use device timezone.
