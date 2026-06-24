## 2025-05-15 - Accessibility in Auth Forms
**Learning:** Auth pages (Login/Signup) often have custom layouts that bypass standard UI components, leading to missing accessibility attributes like `aria-label` on icon-only toggles and disconnected form labels.
**Action:** Always verify `aria-label` on password visibility and theme toggles in custom form implementations. Ensure all form labels use `htmlFor` to link to input `id`s.

## 2025-05-20 - Form Accessibility and Live Feedback
**Learning:** In data-heavy monitoring forms, linking labels to inputs via `id`/`htmlFor` is critical for accessibility. Furthermore, providing `aria-live="polite"` on dynamic status indicators (like vital sign thresholds) ensures that screen reader users receive immediate feedback on the state of their health data without losing focus on the input.
**Action:** Implement `aria-live` regions for any form element that provides real-time status or validation feedback based on user input.
