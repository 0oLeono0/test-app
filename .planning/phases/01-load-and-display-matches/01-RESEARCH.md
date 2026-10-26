# Phase 1 Research: Load and Display Matches

**Date:** 2026-10-26
**Method:** Inline research per the invoked skill's Codex adapter. No CONTEXT.md exists; --auto selects continue using requirements/research. No user design decisions are invented.

## Recommended Approach

Reuse the existing Expo 57, RN 0.86.3 and React 19 single-screen entry. No runtime dependencies. A small src/matches.ts module owns response types, validation and presentation helpers. src/hooks/useMatches.ts owns the initial request and retry lifecycle. src/components/MatchCard.tsx renders a match. MatchesScreen owns state composition and a FlatList keyed by match.id.

Begin with a production end-to-end tracer: configured HTTP GET → parsed round/matches → rendered cards. Then harden invalid responses, request cancellation/timeout, and nullable presentation. Preserve src/config.ts exactly, including its placeholder, and record real-endpoint validation as unresolved. Do not import fixture data into application code.

## Existing Assets and Boundaries

- App.tsx already mounts MatchesScreen in a flex View with top padding 48; reuse this shell.
- MatchesScreen.tsx already uses StyleSheet.create, padding 16, title 24/700; preserve that vocabulary.
- FavoriteButton, useFavorites and UpdatedAgo are for later phases; leave them untouched.
- New exports: Match, MatchesResponse, parseMatchesResponse, formatKickoff, formatScore, getStatusLabel; useMatches; MatchCard.

## Data and Lifecycle Decisions (Agent-selected)

Validate the JSON envelope and records at the network boundary instead of casting unknown JSON. Accept the four fixture statuses and preserve unknown string statuses using a Russian fallback label. Required club/id fields and null-or-finite kickoff dates must be safe before rendering. Score null is distinct from a 0–0 object. Reject invalid shapes as errors rather than silently showing an empty list. IDs must be unique for stable list keys.

Render score null as «Счёт пока неизвестен», missing kickoff as «Дата и время уточняются», status labels as «Предстоящий», «Завершён», «В прямом эфире», «Перенесён», unknown as «Статус неизвестен». Format non-null kickoff using ru-RU date/time options without a timeZone override. Preserve supplied order. No sorting or current-date classification.

Check response.ok before parsing, catch network/JSON/shape errors, expose a single retry action, disable repeat retry while pending, and cancel/ignore stale work after effect cleanup. A finite request timeout (15 seconds) must produce a retryable error rather than indefinite loading. Fetch can be aborted through AbortController; confirm the runtime API and run typecheck before execution completion.

## Validation Architecture

Node v24.12.0 is installed. Use built-in node:test and assert in tests/matches.test.mjs importing the pure TypeScript domain module; no framework installation. Quick command: npx tsc --noEmit. Full domain command: node --test tests/matches.test.mjs. Domain tests should detect lost 0–0, null/invalid dates, incorrect timezone handling, invalid envelope and duplicate IDs. Add targeted tests before implementing pure logic and observe them fail once.

Browser verification through Playwright request interception covers pending/loading, all eight fixture records, initial HTTP/network/JSON/shape failures, retry recovery, and empty results. At 360px verify names and absence of horizontal overflow; use an emulated non-Moscow timezone to prove local kickoff conversion. Do not equate intercepted responses with remote endpoint availability. Expo Go is unverified unless a real device/session is available.

## Scope and Risks

One read-only JSON GET is the complete external capability in scope. No database, auth, native module, external deployment, write endpoint, filters, favorites, refresh or timer changes belong to Phase 1. The generic Walking Skeleton's DB-write/routing suggestions do not apply to this assignment and must not expand its scope.

## Sources

- README.md, AGENTS.md, package.json, App.tsx, src/config.ts, data/matches.json and starter screen — inspected source facts.
- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/) and [Expo index](https://docs.expo.dev/llms.txt), fetched 2026-10-26.
- [RN 0.86 networking](https://reactnative.dev/docs/0.86/network) — fetch integration.
- [RN 0.86 FlatList](https://reactnative.dev/docs/0.86/flatlist) — keys, list rendering and shallow props.
- [React useEffect](https://react.dev/reference/react/useEffect) — request cleanup and stale-response protection.

Confidence: high for source scope and documented API approach; real endpoint and Expo Go runtime remain unverified.
