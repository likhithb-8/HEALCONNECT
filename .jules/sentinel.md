## 2025-05-14 - [Hardcoded Admin Registration Secret]
**Vulnerability:** A hardcoded secret string ("HEALCONNECT2024") was used in `pages/signup.js` to authorize administrative account registrations.
**Learning:** Hardcoding administrative secrets in client-side code exposes them via source control and browser inspection, allowing unauthorized users to gain elevated privileges.
**Prevention:** Always use environment variables for secrets and authentication codes. For sensitive operations like admin registration, the validation should ideally occur on a secure backend or via server-side logic to prevent exposure to the client.

## 2025-05-15 - [Missing Role-Based Access Control in AuthCheck]
**Vulnerability:** The AuthCheck component only verified if a user was logged in but did not validate if the user had the correct role (admin, doctor, or patient) for the specific page being accessed.
**Learning:** Authentication is not Authorization. Users could bypass intended role boundaries by manually navigating to restricted routes if they were logged in with any valid role.
**Prevention:** Components designed for route protection must support and enforce role-based access control (RBAC). Always pass the requiredRole to the protection component and verify it against the authenticated user's session or profile.
