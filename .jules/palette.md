## 2025-05-15 - Accessibility in Auth Forms
**Learning:** Auth pages (Login/Signup) often have custom layouts that bypass standard UI components, leading to missing accessibility attributes like `aria-label` on icon-only toggles and disconnected form labels.
**Action:** Always verify `aria-label` on password visibility and theme toggles in custom form implementations. Ensure all form labels use `htmlFor` to link to input `id`s.

## 2026-06-26 - Focus Ring and Loading State Feedback
**Learning:** Legacy forms using inline styles with 'outline: none' completely break keyboard navigation visibility. Modernizing these with utility-based focus rings (e.g., Tailwind's focus:ring) restores accessibility without requiring a full CSS refactor. Additionally, providing immediate visual feedback on submit (LOGGING IN...) prevents double-submission and improves perceived performance.
**Action:** When encountering 'outline: none' in inline styles, replace it with accessible focus classes and always ensure a loading state is present for async form actions.
