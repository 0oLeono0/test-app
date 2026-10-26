# Phase 4: Refresh and Freshness — Context

Gathered: 2026-10-26. Automatic continuation explicitly authorized by user. Inline workflow under the skill adapter.

<domain>
Deliver the roadmap's REFRESH-01, REFRESH-02, REFRESH-03 requirements only. Preserve unchanged MATCHES_URL; the user waived live-feed verification as a blocking condition, not the known 404 itself.
</domain>

<decisions>
## Implementation Decisions
- D-01: Use a visible Обновить button for web and Expo Go. Preserve data, filters and favorites during refresh; timestamp advances on success only. Measure wall-clock elapsed seconds, not tick count.
- D-02: Reuse Expo 57 / RN 0.86 and existing platform primitives; no new native or runtime dependencies.
</decisions>

<code_context>
Existing App.tsx → MatchesScreen → useMatches / MatchCard. src/matches.ts owns pure domain logic. FavoriteButton/useFavorites/UpdatedAgo retain their established contracts.
</code_context>

<deferred>
No backend, routing, search, persisted favorites or dark theme. Phase 5 records the focused filter test as the one optional enhancement.
</deferred>

