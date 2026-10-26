---
phase: "1"
slug: load-and-display-matches
status: draft
nyquist_compliant: false
wave_0_complete: false
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

- [ ] Task 1 creates tests/matches.test.mjs; observe red before domain implementation.
- No dependency installation required; node:test is bundled with the installed Node runtime.

## Browser and Manual Verification

Controlled responses: delayed fixture → loading then eight cards; 503 → error → retry → fixture; network error; malformed JSON; invalid envelope; empty matches; 0–0 and null kickoff; 360px layout; non-Moscow timezone. Verify src/config.ts unchanged. The real placeholder URL is a separate validation limitation. Expo Go requires a device; do not mark tested without one.

## Validation Sign-Off

Pending execution evidence. Set nyquist_compliant only after sampling and all applicable cases are actually checked. Planning review confirms each task has an automated command with explicit failure conditions.
