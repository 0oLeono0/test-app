---
phase: "3"
slug: reliable-favorites
status: draft
nyquist_compliant: false
wave_0_complete: true
created: "2026-10-26"
---

# Phase 3 Validation

Quick: npx tsc --noEmit. Full domain suite: node --test tests/matches.test.mjs. Existing Node 24 runner needs no packages. Run types/domain tests after each implementation task, and browser checks before completing the phase. Failure means nonzero exit, failed assertions, missing expected controls or incorrect observed states.

Browser RED: verify current cards have no favorite controls. After integration verify all eight stars initially inactive, first favorite becomes active, another remains independent, rapid repeated toggles return expected parity, filter round-trip preserves selection. Recheck refresh preservation in Phase 4. Run domain suite and types.

No watch-mode commands. Existing domain test infrastructure covers Wave 0. Browser verification is performed with intercepted responses and recorded separately from the accepted unavailable real feed. Expo Go device validation remains unperformed unless a real session becomes available.

