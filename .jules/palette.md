## 2025-05-15 - Accessibility in Auth Forms
**Learning:** Auth pages (Login/Signup) often have custom layouts that bypass standard UI components, leading to missing accessibility attributes like `aria-label` on icon-only toggles and disconnected form labels.
**Action:** Always verify `aria-label` on password visibility and theme toggles in custom form implementations. Ensure all form labels use `htmlFor` to link to input `id`s.

## 2026-06-25 - Modernizing Notifications with react-hot-toast
**Learning:** Legacy components in this codebase often use direct DOM manipulation (e.g., `document.getElementById`) to show/hide hidden notification `div`s, which bypasses the React lifecycle and lacks proper accessibility (ARIA roles).
**Action:** Replace manual DOM-based notification systems with `react-hot-toast` to ensure consistent transitions and screen-reader accessibility across all asynchronous form submissions.
