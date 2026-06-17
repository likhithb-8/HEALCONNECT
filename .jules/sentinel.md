## 2025-05-14 - [Hardcoded Admin Registration Secret]
**Vulnerability:** A hardcoded secret string ("HEALCONNECT2024") was used in `pages/signup.js` to authorize administrative account registrations.
**Learning:** Hardcoding administrative secrets in client-side code exposes them via source control and browser inspection, allowing unauthorized users to gain elevated privileges.
**Prevention:** Always use environment variables for secrets and authentication codes. For sensitive operations like admin registration, the validation should ideally occur on a secure backend or via server-side logic to prevent exposure to the client.

## 2025-05-15 - [Missing Role-Based Access Control on Admin Routes]
**Vulnerability:** The Admin Support Management page (`pages/admin/support-management.js`) was accessible to any logged-in user (including patients) because it lacked the `AuthCheck` wrapper. Additionally, the existing `AuthCheck` component only verified *any* authenticated session rather than verifying specific roles.
**Learning:** In a multi-tenant or multi-role system, authentication is not enough; authorization (RBAC) must be enforced on every protected route. Centralized auth components should be extensible enough to handle role-specific requirements.
**Prevention:** Implement a `requiredRole` prop in authentication wrappers and ensure every restricted route is wrapped with it. Regularly audit route files for missing protection wrappers.
