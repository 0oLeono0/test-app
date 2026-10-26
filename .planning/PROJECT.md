# Матчи тура

## What This Is

A small Russian-language Expo / React Native assignment for viewing football matches in a round. Complete the existing single screen, repair the supplied favorites and elapsed-time behavior, and explain the causes and tradeoffs in SOLUTION.md. The audience is the assignment reviewer and a user checking fixtures and results.

## Core Value

Users can reliably inspect every match and toggle its favorite state, with correct data and explanations that demonstrate understanding of the supplied bugs.

## Requirements

### Validated

- ✓ HTTP client, validated cards, initial loading/error/retry/empty states — Phase 1, controlled HTTP responses; live endpoint waived.
- ✓ Three status filters with explicit live/postponed policy — Phase 2.
- ✓ Independent immutable in-memory favorites across filters and refresh — Phase 3.
- ✓ Manual refresh, retained data after failures, wall-clock freshness and interval cleanup — Phase 4.
- ✓ Nine domain tests, passing types, integrated browser checks and Russian SOLUTION.md — Phase 5.

### Active

- [ ] Resolve the real endpoint only if the user changes the explicit instruction to retain the placeholder; then verify live success.
- [ ] Run on a real Expo Go device when available; no native-device success is claimed.

### Out of Scope

- Authentication, backend services, routing, and live-score subscriptions — outside this single-screen assignment.
- Native modules requiring a development build — Expo Go must remain supported.
- Publishing a public fork or messaging the reviewer — submission requires an actual destination and a separate request.
- Optional search, persistence, dark theme, or filter tests — consider only after required scope fits the README timebox.

## Context

Source of scope: README.md, supplied as `gsd-new-project --auto README.md` on 2026-10-26. README targets about one hour and a two-hour maximum for implementation; favor small changes and readable code over visual polish or infrastructure.

Existing stack: expo ~57.0.29, React 19.2.3, React Native 0.86.3, react-native-web ^0.21.2, TypeScript ~6.0.3. App.tsx mounts MatchesScreen directly; it now composes useMatches, useFavorites, filters, MatchCard and UpdatedAgo. Domain types/validation/formatting live in src/matches.ts. No router or new runtime dependency was introduced.

Data fixture contains eight matches: three finished, one live, three scheduled, and one postponed. Important cases are a 0–0 score, null scores, a null kickoff, a live minute, long club names, and UTC timestamps. Status, rather than today's date, determines filtering: fixture dates can be in the past while status remains scheduled.

Starter defects were repaired: useFavorites now uses includes and functional immutable updates; UpdatedAgo measures elapsed wall-clock time, responds to since and cleans up its interval. Browser checks verified independent/rapid toggles, preserved favorites, timer progression/reset and clock jumps. react-native-web needed explicit aria-pressed in addition to the native selection state; this was found by a browser assertion.

MATCHES_URL contains the literal OWNER/REPO placeholder. README says not to change the address. Do not invent a real URL, silently replace remote loading with bundled data, or mark live loading verified; identify the authoritative endpoint before final remote validation. Use the supplied fixture through intercepted HTTP responses for deterministic behavior checks.

## Constraints

- **Compatibility:** Browser via npm run web and Expo Go; keep the existing single-screen architecture.
- **Documentation:** Before touching Expo or React Native APIs, inspect package.json, fetch the matching SDK 57 docs, and consult docs.expo.dev/llms.txt and its relevant links.
- **Dependencies:** Use npx expo install for additions; prefer existing dependencies for this small assignment.
- **Verification:** Run npx tsc --noEmit before completion; verify actual behavior in the browser and report Expo Go checks truthfully.
- **History:** README requests 3–5 incremental implementation commits; planning commits do not substitute for a readable implementation history.
- **Presentation:** Russian labels; device timezone rather than a fixed Moscow timezone; readable layout is sufficient.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Five vertical MVP phases | User selected standard granularity; keep phases small enough for this assignment | Pending |
| YOLO, parallel independent plans, research/checks/verifier/drift guard, Git tracking | Auto invocation plus explicit configuration reply | Selected |
| Adaptive model profile | Explicit user selection; retain profile for future GSD work | Selected |
| No optional PR-body sections | Minimal default for a small assignment; no preference supplied | Default |
| Keep MATCHES_URL unchanged despite HTTP 404 | User explicitly chose to record the endpoint gap on 2026-10-26 | Confirmed; live loading unresolved |
| Treat live endpoint check as non-blocking | User explicitly approved continuing all remaining phases with this exception | Accepted override; never reported as live success |
| Filters: scheduled → upcoming; finished → finished; live/postponed → All only | Avoid implying a live or postponed match is scheduled; document this agent-selected policy in SOLUTION.md | Proposed |
| Retain React state and platform primitives | Scope does not justify a state manager or query framework | Proposed |

## Evolution

At each phase transition, move verified requirements to Validated, record new decisions, move invalidated scope to Out of Scope with reasons, and update this description if behavior changes. At milestone close, review all sections, recheck the core value and exclusions, and record the delivered state and remaining limitations.

---
*Last updated: 2026-10-26 after v1.0 implementation milestone*

## Current State

v1.0 local implementation complete: five phases, five plans, seven tasks; 19 requirements verified and one accepted live-verification override. Nine domain tests and typecheck pass; controlled browser integration checks cover the required flows. No public deployment, submission or remote push occurred.

## Next Milestone Goals

No new feature milestone requested. Possible follow-up: authoritative URL, real Expo Go device verification and repository-hosted browser regressions.
