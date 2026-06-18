## 2025-05-15 - Accessibility in Auth Forms
**Learning:** Auth pages (Login/Signup) often have custom layouts that bypass standard UI components, leading to missing accessibility attributes like `aria-label` on icon-only toggles and disconnected form labels.
**Action:** Always verify `aria-label` on password visibility and theme toggles in custom form implementations. Ensure all form labels use `htmlFor` to link to input `id`s.

## 2025-05-20 - Form Accessibility in Shared Components
**Learning:** Form components (FormInput, FormDropdown) are sometimes defined locally within pages. Updates to these components must be applied consistently across all instances. Additionally, avoid placing `id` attributes on `<option>` tags within dropdowns as it often leads to duplicate IDs in the DOM.
**Action:** Search for local component definitions when fixing accessibility issues. Ensure `htmlFor` links correctly to the input `id` and keep options free of redundant IDs.
