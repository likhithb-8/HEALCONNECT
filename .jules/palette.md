## 2025-05-15 - Accessibility in Auth Forms
**Learning:** Auth pages (Login/Signup) often have custom layouts that bypass standard UI components, leading to missing accessibility attributes like `aria-label` on icon-only toggles and disconnected form labels.
**Action:** Always verify `aria-label` on password visibility and theme toggles in custom form implementations. Ensure all form labels use `htmlFor` to link to input `id`s.

## 2025-05-16 - Mobile Sidebar Accessibility and Event Interception
**Learning:** Mobile sidebar toggles implemented as `<span>` or `<li>` lack keyboard focus and screen-reader context. Furthermore, fixed navbars (z-index 1000) can obscure these controls. Overlapping "Open" and "Close" buttons can cause pointer event interception issues in automation tools like Playwright if both are present in the DOM.
**Action:** Use semantic `<button>` with `aria-label` and `aria-expanded`. Ensure sidebar containers use a higher z-index (e.g., `z-[1001]`) than the Navbar. Conditionally render the "Open" toggle (`{!isOpen && ...}`) to prevent click interception when the menu is active.
