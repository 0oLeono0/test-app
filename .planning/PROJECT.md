# Матчи тура

## What This Is

A small Russian-language Expo / React Native assignment for viewing football matches in a round. Complete the existing single screen, repair the supplied favorites and elapsed-time behavior, and explain the causes and tradeoffs in SOLUTION.md. The audience is the assignment reviewer and a user checking fixtures and results.

## Core Value

Users can reliably inspect every match and toggle its favorite state, with correct data and explanations that demonstrate understanding of the supplied bugs.

## Requirements

### Validated

None yet — starter source is present, but runtime behavior has not been verified.

### Active

- [ ] Load matches from MATCHES_URL and render teams, optional score, local kickoff time, and Russian statuses.
- [ ] Provide loading, error with retry, empty results, and the three required filters.
- [ ] Integrate independently toggled favorites and repair membership checks and state updates.
- [ ] Refresh data and show accurate elapsed time since the last successful load.
- [ ] Complete SOLUTION.md with concise, truthful explanations and verification evidence.

### Out of Scope

- Authentication, backend services, routing, and live-score subscriptions — outside this single-screen assignment.
- Native modules requiring a development build — Expo Go must remain supported.
- Publishing a public fork or messaging the reviewer — submission requires an actual destination and a separate request.
- Optional search, persistence, dark theme, or filter tests — consider only after required scope fits the README timebox.

## Context

Source of scope: README.md, supplied as `gsd-new-project --auto README.md` on 2026-10-26. README targets about one hour and a two-hour maximum for implementation; favor small changes and readable code over visual polish or infrastructure.

Existing stack: expo ~57.0.29, React 19.2.3, React Native 0.86.3, react-native-web ^0.21.2, TypeScript ~6.0.3. App.tsx mounts MatchesScreen directly; the screen currently renders only a title. FavoriteButton already has active/onPress props and Russian accessibility labels. No router or domain types exist.

Data fixture contains eight matches: three finished, one live, three scheduled, and one postponed. Important cases are a 0–0 score, null scores, a null kickoff, a live minute, long club names, and UTC timestamps. Status, rather than today's date, determines filtering: fixture dates can be in the past while status remains scheduled.

Observed bugs: useFavorites treats indexOf's -1 as true and index 0 as false, mutates its array with push/splice, and sets the same reference. UpdatedAgo captures initial seconds in an empty-dependency effect, ignores since, and does not clean up its interval. These are source findings, not claims of completed fixes.

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
| Filters: scheduled → upcoming; finished → finished; live/postponed → All only | Avoid implying a live or postponed match is scheduled; document this agent-selected policy in SOLUTION.md | Proposed |
| Retain React state and platform primitives | Scope does not justify a state manager or query framework | Proposed |

## Evolution

At each phase transition, move verified requirements to Validated, record new decisions, move invalidated scope to Out of Scope with reasons, and update this description if behavior changes. At milestone close, review all sections, recheck the core value and exclusions, and record the delivered state and remaining limitations.

---
*Last updated: 2026-10-26 after initialization*
