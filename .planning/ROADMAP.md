# Roadmap: Матчи тура

## Overview

Deliver the README assignment as five compact vertical MVP slices, using the selected standard granularity. Preserve Expo Go and web compatibility. Required behavior and understanding take priority over optional enhancements. Each phase should produce a focused implementation commit; existing planning commits are separate.

## Phases

- [x] **Phase 1: Load and Display Matches** — HTTP-loaded match cards and complete initial request states. (completed 2026-10-26)
- [x] **Phase 2: Filter the Round** — Three status filters with explicit edge-case behavior. (completed 2026-10-26)
- [ ] **Phase 3: Reliable Favorites** — Independent, visible favorite toggles across filters.
- [ ] **Phase 4: Refresh and Freshness** — Manual refresh and accurate time since successful loading.
- [ ] **Phase 5: Verify and Explain** — Combined behavior checks and concise SOLUTION.md.

## Phase Details

### Phase 1: Load and Display Matches

**Goal:** User can load and inspect the round's matches, including nullable data and recoverable request states.
**Mode:** mvp
**Depends on:** Nothing (first phase)
**Requirements:** MATCH-01, MATCH-02, MATCH-03, MATCH-04, MATCH-05, LOAD-01, LOAD-02, LOAD-03
**UI hint:** yes
**Success Criteria:**
1. A successful fixture-backed HTTP response displays all eight matches with both club names and Russian statuses.
2. The 0–0 result is visible, null scores have a clear fallback, and the postponed match shows an unknown kickoff rather than an epoch date.
3. Valid kickoff times display in the device timezone, and long names remain readable in a narrow viewport.
4. Pending, failed, and empty responses show distinct loading, error/retry, and empty states; retry can recover to the list.
5. Production loading still uses MATCHES_URL; its placeholder endpoint is explicitly resolved or reported as a remaining validation blocker.

**Plans:** 1/1 plans complete

Plans:
- [x] 01-01-PLAN.md — Validated HTTP-to-card tracer, recoverable request states, and browser verification.

**Verification:** gaps_found — implementation and controlled checks pass; unchanged MATCHES_URL returns 404. User chose to record this endpoint gap. No phase completion/transition claimed.

### Phase 2: Filter the Round

**Goal:** User can narrow the displayed round by status without losing exceptional matches from All.
**Mode:** mvp
**Depends on:** Phase 1
**Requirements:** FILTER-01, FILTER-02, FILTER-03
**UI hint:** yes
**Success Criteria:**
1. «Все», «Предстоящие», and «Завершённые» appear above the list with a visible selected state.
2. The supplied fixture yields eight, three, and three matches respectively; live/postponed remain in All only.
3. Empty filtered results have a clear message and the user can switch back to All.

**Plans:** TBD

### Phase 3: Reliable Favorites

**Goal:** User can reliably favorite individual matches and keep that state through list changes.
**Mode:** mvp
**Depends on:** Phase 2
**Requirements:** FAV-01, FAV-02, FAV-03
**UI hint:** yes
**Success Criteria:**
1. All stars start inactive for an empty favorites collection, including IDs absent from the collection.
2. Repeated and rapid toggles visibly affect only the selected match, including the first favorite and multiple independent favorites.
3. Switching filters preserves favorites by ID; the existing FavoriteButton remains connected through active/onPress.
4. Rerendering the same loaded match IDs preserves favorites; Phase 4 rechecks this through actual refresh.

**Plans:** TBD

### Phase 4: Refresh and Freshness

**Goal:** User can reload matches and trust the elapsed-time label as the age of the last successful response.
**Mode:** mvp
**Depends on:** Phase 3
**Requirements:** REFRESH-01, REFRESH-02, REFRESH-03
**UI hint:** yes
**Success Criteria:**
1. User can initiate refresh, see its pending state, and receive updated cards while favorites survive for unchanged IDs.
2. «Обновлено N сек назад» advances beyond one second, resets after successful refresh, and uses elapsed wall-clock time rather than accumulated ticks.
3. Failed refresh keeps existing cards and last-success age visible, shows an error, and offers recovery.
4. Remounting UpdatedAgo does not leave old intervals running; stale or overlapping responses cannot overwrite newer successful data.

**Plans:** TBD

### Phase 5: Verify and Explain

**Goal:** Reviewer can run and assess the completed assignment and understand the actual bug causes and tradeoffs.
**Mode:** mvp
**Depends on:** Phase 4
**Requirements:** DOC-01, DOC-02, VERIFY-01
**UI hint:** no
**Success Criteria:**
1. SOLUTION.md explains indexOf truthiness, array mutation/same-reference updates, stale captured seconds, ignored since, and interval cleanup in concise wording.
2. SOLUTION.md records filter policy, nullable/zero data handling, actual time, work completed/remaining, AI usage and checks, and proposed improvements.
3. npx tsc --noEmit passes, npm run web serves the app, and the required loading/error/empty/filter/favorite/refresh behaviors are checked with controlled HTTP responses.
4. Remaining endpoint limitations and any Expo Go checks not performed are explicitly recorded; changes add no native dependency requiring a development build.

**Plans:** TBD

## Progress

**Execution Order:** 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Load and Display Matches | 1/1 | Complete    | 2026-10-26 |
| 2. Filter the Round | 1/1 | Complete    | 2026-10-26 |
| 3. Reliable Favorites | 0/TBD | Not started | - |
| 4. Refresh and Freshness | 0/TBD | Not started | - |
| 5. Verify and Explain | 0/TBD | Not started | - |

## Coverage

20 v1 requirements map to exactly one phase: 8 + 3 + 3 + 3 + 3. Optional EXTRA requirements remain outside this roadmap unless time remains after mandatory verification.
