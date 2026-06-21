## 2025-05-15 - Accessibility in Auth Forms
**Learning:** Auth pages (Login/Signup) often have custom layouts that bypass standard UI components, leading to missing accessibility attributes like `aria-label` on icon-only toggles and disconnected form labels.
**Action:** Always verify `aria-label` on password visibility and theme toggles in custom form implementations. Ensure all form labels use `htmlFor` to link to input `id`s.

## 2026-06-21 - Accessible Dynamic Forms
**Learning:** Custom form implementations with "floating labels" or high-density layouts frequently omit unique `id` attributes on inputs, breaking label association. Furthermore, dynamic status text (e.g., 'Normal', 'Elevated') that updates as a user types is invisible to screen readers unless wrapped in an `aria-live` region.
**Action:** Use unique `id` and `htmlFor` for all form fields. Wrap real-time validation or status updates in `aria-live="polite"` containers.
