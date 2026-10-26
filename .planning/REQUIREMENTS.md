# Requirements: Матчи тура

**Defined:** 2026-10-26
**Core Value:** Users can reliably inspect every match and toggle its favorite state, with correct data and explanations that demonstrate understanding of the supplied bugs.

## v1 Requirements

### Match Loading and Presentation

- [ ] **MATCH-01**: User can load the round's matches over HTTP from MATCHES_URL; unsuccessful HTTP/JSON responses produce an error rather than false success.
- [ ] **MATCH-02**: User can see home and away club names on every match card, including long names without losing essential content.
- [ ] **MATCH-03**: User can see a supplied score including 0–0, and a clear no-score state when score is null.
- [ ] **MATCH-04**: User can see kickoff date/time in the device timezone, and a clear unknown-time label when startsAt is null.
- [ ] **MATCH-05**: User can read a Russian label for scheduled, finished, live, and postponed statuses.

### Request States

- [ ] **LOAD-01**: User sees a loading indicator while the initial request is pending.
- [ ] **LOAD-02**: User sees an understandable error and can retry the failed load with «Повторить».
- [ ] **LOAD-03**: User sees an understandable empty state when the server returns no matches.

### Status Filters

- [ ] **FILTER-01**: User can select «Все», «Предстоящие», and «Завершённые» above the list.
- [ ] **FILTER-02**: User sees scheduled matches under Upcoming and finished matches under Finished, regardless of current date; live/postponed remain visible in All.
- [ ] **FILTER-03**: User sees an understandable empty result when a selected filter has no matches.

### Favorites

- [ ] **FAV-01**: User sees an inactive favorite star for every match on first load when favorites are empty.
- [ ] **FAV-02**: User can repeatedly toggle one match independently, including rapid interactions and the first stored favorite, with visible state updates.
- [ ] **FAV-03**: User retains in-memory favorites by match ID while switching filters and refreshing the same matches.

### Refresh and Freshness

- [ ] **REFRESH-01**: User can request fresh data through «Обновить» or pull-to-refresh and sees that the refresh is pending.
- [ ] **REFRESH-02**: User sees «Обновлено N сек назад» advance with elapsed wall-clock time from the last successful load and reset after another success.
- [ ] **REFRESH-03**: User retains previously loaded matches and the last-success freshness timestamp after a failed refresh, with an error and a recovery action.

### Delivery and Understanding

- [ ] **DOC-01**: Reviewer can read 1–3 sentences per reported problem in SOLUTION.md explaining the actual favorites and timer causes and fixes.
- [ ] **DOC-02**: Reviewer can read the status-filter policy, data edge cases, actual time spent, completed/remaining work, AI usage and verification, and possible improvements in the existing SOLUTION.md template.
- [ ] **VERIFY-01**: Reviewer can run the app with npm run web after npm install and see passing npx tsc --noEmit evidence; changes remain compatible with Expo Go and introduce no development-build-only native module.

## v2 Requirements

Optional only if required work is complete and the README timebox permits: choose at most one and explain why in SOLUTION.md.

- **EXTRA-01**: User can search by club name.
- **EXTRA-02**: User retains favorites between launches.
- **EXTRA-03**: Reviewer can run a focused filter-logic regression test.
- **EXTRA-04**: User can view the app in a dark theme.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Authentication, backend, router, standings | Single-screen assignment with an existing data source |
| Live polling and notifications | README asks for manual refresh |
| Elaborate visual design | Readability is sufficient; behavior and explanations take priority |
| Publishing a fork or sending the submission link | No target repository or messaging request supplied |
| Silently replacing MATCHES_URL with local data | Would hide the placeholder endpoint and violate remote loading scope |

## Definition of Done

All mandatory behaviors are checked against fixture-backed HTTP responses and failure/empty responses in the browser. Typecheck passes. Timer advances and resets only after successful loading; favorites remain independent. Endpoint limitations and any unperformed Expo Go checks are explicit. Implementation history has incremental commits. No requirement is marked complete solely because a planning document exists.

## Traceability

Roadmap creation populates the mapping below. Every v1 requirement must map to exactly one phase.

| Requirement | Phase | Status |
|-------------|-------|--------|

**Coverage:** 20 v1 requirements; mapping pending roadmap creation.

---
*Last updated: 2026-10-26 after requirements definition*
