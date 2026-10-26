---
phase: "1"
slug: load-and-display-matches
status: approved
shadcn_initialized: false
preset: none
created: "2026-10-26"
---

# Phase 1 — UI Design Contract

Prepared and reviewed inline under the skill adapter. Agent-selected defaults follow the README's readable-layout requirement.

## Design System

Tool: none. Component library: existing React Native primitives. Icons: none for Phase 1. Font: platform system font. Keep the App.tsx shell and existing white background.

## Spacing Scale

4: inline gaps; 8: row gaps and metadata; 12: card gaps and compact padding; 16: screen/card padding; 24: heading separation. Existing shell top padding 48 stays unchanged. Border width 1 and minimum button height 44 are geometry/accessibility exceptions.

## Typography

Heading: 24/700, lineHeight 32. Team/body: 16/400 or 600, lineHeight 24. Score: 20/700, lineHeight 28. Metadata/status: 14/400 or 600, lineHeight 20. System scaling remains enabled. Club names wrap; no forced single line.

## Color

Dominant white #ffffff; secondary card #f9fafb; text #111827; metadata #4b5563; border #d1d5db. Accent #1d4ed8 reserved for retry button and loading indicator. Error #b91c1c reserved for failure text. No decorative images or new visual libraries.

## Copywriting Contract

| Element | Copy |
|---------|------|
| Screen title | Матчи тура |
| Round | Тур N |
| Loading | Загрузка матчей… |
| Empty heading | Матчей пока нет |
| Empty body | Матчи появятся здесь, когда будет опубликовано расписание. |
| Error heading | Не удалось загрузить матчи |
| Error body | Проверьте подключение к интернету и попробуйте ещё раз. |
| Recovery CTA | Повторить |
| Missing score | Счёт пока неизвестен |
| Missing kickoff | Дата и время уточняются |
| Unknown status | Статус неизвестен |
| Destructive confirmation | Not applicable: no destructive actions |

## UI Considerations

| Category | Elements | Status | Resolution |
|----------|----------|--------|------------|
| loading | list | covered | Spinner and loading copy replace the initial list while pending |
| error | list | covered | Error heading/body and accessible retry button |
| empty | list | covered | Empty heading/body when successful matches array is empty |
| partial | card | covered | Null score/time use documented fallback; zero scores render numerically |
| long-text | club names | covered | Names wrap at narrow widths without hiding score or status |
| overflow | list | covered | Vertical scroll; screen/card minWidth and flex layout avoid horizontal overflow |
| populated | list | covered | Preserve server order; stable unique IDs; home/away roles explicit |

## Accessibility

Retry has accessibilityRole button and a minimum 44px target, works with keyboard on web, and is disabled while pending. Loading has a meaningful accessibility label. Text contrast is maintained and content is conveyed in words, not color alone.

## Registry Safety

Not applicable: no registry components or third-party UI blocks.

## Checker Sign-Off

Inline review: copy, visuals, color, typography, spacing, registry safety, and inventory provenance pass. No design-system inventory is required because Tool is none. Runtime conformance remains to be verified.
