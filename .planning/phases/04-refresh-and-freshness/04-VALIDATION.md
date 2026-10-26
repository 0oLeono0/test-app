---
phase: "4"
slug: refresh-and-freshness
status: draft
nyquist_compliant: false
wave_0_complete: true
created: "2026-10-26"
---

# Phase 4 Validation

Quick: npx tsc --noEmit. Full domain suite: node --test tests/matches.test.mjs. Existing Node 24 runner needs no packages. Run types/domain tests after each implementation task, and browser checks before completing the phase. Failure means nonzero exit, failed assertions, missing expected controls or incorrect observed states.

Browser verify RED before fix: no refresh control/elapsed label. GREEN: pending refresh keeps cards, button disables, elapsed age progresses beyond one second, successful response resets age, failed refresh keeps existing cards and increasing age then retry recovers. Use browser clock jump to detect counting-ticks drift. Filter/favorite state survives successful and failed refresh. Inspect interval cleanup.

No watch-mode commands. Existing domain test infrastructure covers Wave 0. Browser verification is performed with intercepted responses and recorded separately from the accepted unavailable real feed. Expo Go device validation remains unperformed unless a real session becomes available.

