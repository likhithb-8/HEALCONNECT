## 2025-05-15 - Accessibility in Auth Forms
**Learning:** Auth pages (Login/Signup) often have custom layouts that bypass standard UI components, leading to missing accessibility attributes like `aria-label` on icon-only toggles and disconnected form labels.
**Action:** Always verify `aria-label` on password visibility and theme toggles in custom form implementations. Ensure all form labels use `htmlFor` to link to input `id`s.

## 2025-05-16 - Navigation Accessibility Pattern
**Learning:** For navigation menus using Next.js Link, include `aria-current="page"` when the current route matches the link's href to inform assistive technologies of the active page. Additionally, mobile menu toggles should use `aria-expanded` to communicate state.
**Action:** Implement `aria-current` on navigation links and `aria-expanded` on interactive toggles that show/hide content.
