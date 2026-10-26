---
phase: "5"
slug: verify-and-explain
status: draft
nyquist_compliant: false
wave_0_complete: true
created: "2026-10-26"
---

# Phase 5 Validation

Quick: npx tsc --noEmit. Full domain suite: node --test tests/matches.test.mjs. Existing Node 24 runner needs no packages. Run types/domain tests after each implementation task, and browser checks before completing the phase. Failure means nonzero exit, failed assertions, missing expected controls or incorrect observed states.

Run npx tsc --noEmit, node --test tests/matches.test.mjs and combined Playwright scenarios. Inspect browser screenshot and console. git diff --exit-code 833dddb -- src/config.ts must be zero. Confirm all SOLUTION template headings filled and test evidence matches actual output.

No watch-mode commands. Existing domain test infrastructure covers Wave 0. Browser verification is performed with intercepted responses and recorded separately from the accepted unavailable real feed. Expo Go device validation remains unperformed unless a real session becomes available.

