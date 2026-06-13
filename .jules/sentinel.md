## 2025-05-14 - [Hardcoded Admin Registration Secret]
**Vulnerability:** A hardcoded secret string ("HEALCONNECT2024") was used in `pages/signup.js` to authorize administrative account registrations.
**Learning:** Hardcoding administrative secrets in client-side code exposes them via source control and browser inspection, allowing unauthorized users to gain elevated privileges.
**Prevention:** Always use environment variables for secrets and authentication codes. For sensitive operations like admin registration, the validation should ideally occur on a secure backend or via server-side logic to prevent exposure to the client.

## 2026-06-13 - [Broken Access Control in AuthCheck]
**Vulnerability:** The `AuthCheck` component previously only verified if *any* user was logged in (checking for the existence of `userType`), failing to enforce role-based authorization. This allowed patients to access admin and doctor dashboards via direct URL navigation.
**Learning:** Authentication (knowing who a user is) does not equal Authorization (knowing what they can do). A global auth check is insufficient for multi-role applications.
**Prevention:** Implement mandatory role verification in the protection layer. All role-restricted pages must explicitly define the `requiredRole` and the check component must provide a secure fallback (Access Denied UI) for unauthorized sessions.
