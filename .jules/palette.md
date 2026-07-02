## 2025-05-15 - Accessibility in Auth Forms
**Learning:** Auth pages (Login/Signup) often have custom layouts that bypass standard UI components, leading to missing accessibility attributes like `aria-label` on icon-only toggles and disconnected form labels.
**Action:** Always verify `aria-label` on password visibility and theme toggles in custom form implementations. Ensure all form labels use `htmlFor` to link to input `id`s.

## 2025-05-16 - Form Validation Feedback Typo
**Learning:** In React form implementations using a `touched` state object, dynamic access like `touched[name]` can fail silently if `name` is not what you expect (e.g., shadowed by a loop variable or misspelled), leading to missing error feedback (like red borders).
**Action:** Explicitly verify error state styling for each form field during development. Prefer stable property access (e.g., `touched.fieldName`) when possible or strictly validate the `name` variable before use.
