---
phase: "2"
slug: filter-the-round
status: draft
nyquist_compliant: false
wave_0_complete: true
created: "2026-10-26"
---

# Phase 2 Validation

Quick: npx tsc --noEmit. Full domain suite: node --test tests/matches.test.mjs. Existing Node 24 runner needs no packages. Run types/domain tests after each implementation task, and browser checks before completing the phase. Failure means nonzero exit, failed assertions, missing expected controls or incorrect observed states.

Before implementation add tests expecting fixture filter counts 8/3/3, preservation of IDs/order, unknown statuses only in All, empty subsets and no input mutation; observe RED then GREEN. Browser clicks prove the three counts, selected state, and empty filter recovery.

No watch-mode commands. Existing domain test infrastructure covers Wave 0. Browser verification is performed with intercepted responses and recorded separately from the accepted unavailable real feed. Expo Go device validation remains unperformed unless a real session becomes available.

