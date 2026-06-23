## 2025-05-15 - Accessibility in Auth Forms
**Learning:** Auth pages (Login/Signup) often have custom layouts that bypass standard UI components, leading to missing accessibility attributes like `aria-label` on icon-only toggles and disconnected form labels.
**Action:** Always verify `aria-label` on password visibility and theme toggles in custom form implementations. Ensure all form labels use `htmlFor` to link to input `id`s.

## 2025-05-22 - Sidebar Accessibility and Semantic HTML
**Learning:** Sidebars often use non-semantic elements like `span` or `li` for toggles, which are not keyboard-accessible by default and lack ARIA state information.
**Action:** Use semantic `<button>` elements for all interactive toggles. Include `aria-label` and `aria-expanded` attributes to communicate the component's state to assistive technologies. Ensure focus styles (e.g., Tailwind's `focus:ring`) are present for keyboard users.
