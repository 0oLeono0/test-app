---
phase: "1"
slug: load-and-display-matches
status: validated
nyquist_compliant: true
wave_0_complete: true
created: "2026-10-26"
---

# Phase 1 — Validation Strategy

## Test Infrastructure

Node v24 built-in node:test, no configuration or additional packages. Quick: `npx tsc --noEmit`. Full: `node --test tests/matches.test.mjs` plus controlled browser cases. Test file is created in task 1 before domain implementation. Expected command feedback under 30 seconds; first Metro startup may take longer.

## Sampling Rate

Typecheck after every task; domain tests after tasks 1–3 and before final verification. Browser tracer check before expanding request behavior. No watch-mode validation commands.

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirements | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|--------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | MATCH-01..05 | T-1-01 | Untrusted JSON validated | unit + types | node --test tests/matches.test.mjs | Wave 0 | pending |
| 01-01-02 | 01 | 1 | LOAD-01..03 | T-1-02 | Cancelled/timed-out requests cannot set stale state | types + browser | npx tsc --noEmit | yes | pending |
| 01-01-03 | 01 | 1 | MATCH-01..05, LOAD-01..03 | T-1-01, T-1-02 | Invalid/network responses recover through retry | browser + unit | node --test tests/matches.test.mjs | Wave 0 | pending |

## Wave 0 Requirements

- [x] Task 1 created tests/matches.test.mjs; observed red before domain implementation, then eight passing tests.
- No dependency installation required; node:test is bundled with the installed Node runtime.

## Browser and Manual Verification

Controlled responses: delayed fixture → loading then eight cards; 503 → error → retry → fixture; network error; malformed JSON; invalid envelope; empty matches; 0–0 and null kickoff; 360px layout; non-Moscow timezone. Verify src/config.ts unchanged. The real placeholder URL is a separate validation limitation. Expo Go requires a device; do not mark tested without one.

## Validation Sign-Off

Task 1 and 2 automated checks passed; task 3 controlled browser cases passed. Final npx tsc --noEmit exits 0. Domain suite: 8 passed, 0 failed. Browser checks: loading; 503/retry recovery; network; malformed JSON; invalid envelope; empty; narrow layout; timezone; 15-second timeout/retry. No pageerror events observed. Screenshot inspected at 360×800.

Real endpoint verification remains unavailable: unchanged MATCHES_URL returns HTTP 404. User explicitly waived this check as a blocker and authorized progression. Expo Go device test was not performed. Validation is complete for the adjusted acceptance scope; no real-feed or native-device success is claimed.
