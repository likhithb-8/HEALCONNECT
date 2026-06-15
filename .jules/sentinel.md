## 2025-05-14 - [Hardcoded Admin Registration Secret]
**Vulnerability:** A hardcoded secret string ("HEALCONNECT2024") was used in `pages/signup.js` to authorize administrative account registrations.
**Learning:** Hardcoding administrative secrets in client-side code exposes them via source control and browser inspection, allowing unauthorized users to gain elevated privileges.
**Prevention:** Always use environment variables for secrets and authentication codes. For sensitive operations like admin registration, the validation should ideally occur on a secure backend or via server-side logic to prevent exposure to the client.

## 2026-06-15 - [Insufficient Client-Side Role Validation]
**Vulnerability:** Frontend routes for Admin and Doctor dashboards lacked granular role-based access control, relying only on a general authentication check. This allowed authenticated patients to potentially access admin/doctor views by manual URL manipulation.
**Learning:** General authentication checks are insufficient for multi-role applications. Even if data is secured at the API layer, exposing administrative UI to unauthorized roles is a security risk and poor UX.
**Prevention:** Implement granular Role-Based Access Control (RBAC) in route guards. The updated `AuthCheck` component now validates specifically against a `requiredRole` prop and redirects unauthorized users to their appropriate dashboard.
