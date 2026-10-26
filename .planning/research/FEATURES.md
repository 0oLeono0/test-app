# Feature Research

**Date:** 2026-10-26
**Primary product authority:** README.md. Do not add generic sports-app features to this assignment.

## Table Stakes

| Capability | Complexity | Dependencies |
|------------|------------|--------------|
| HTTP load and readable match cards | Low | Typed response shape; configured endpoint |
| Loading, error/retry, and empty states | Low | Request lifecycle |
| Device-local date/time, optional scores, Russian statuses | Low | Nullable fields; explicit mappings |
| All / Upcoming / Finished filters | Low | Loaded matches and status policy |
| Independent favorite toggle on every card | Low | Fixed useFavorites; stable match IDs |
| Refresh and elapsed seconds since success | Low | Last-success timestamp; fixed UpdatedAgo |
| Concise SOLUTION.md with root causes | Low | Actual implementation and verification evidence |

## Optional Differentiators

Search by club, persisted favorites, a filter-logic test, and dark theme are explicitly optional in README.md. Defer all until the required scope is verified and time remains; choose at most one. A filter-logic test is the smallest candidate if test tooling can remain lightweight. Do not promise it in the mandatory roadmap.

## Anti-features

Accounts, real-time polling/subscriptions, multiple screens, elaborate design, standings, and a custom backend do not serve this assignment's acceptance criteria.

## Data Acceptance Examples

The supplied fixture should show eight cards in All, three in Upcoming (scheduled), and three in Finished. The live and postponed matches appear only in All under the proposed policy. m2 must display 0–0. m7 must show an explicit unknown-time message, not an epoch date. Scheduled status remains authoritative even when fixture dates are earlier than the device's current date.

## Sources

- README.md, data/matches.json, SOLUTION.md — supplied product requirements and examples.
