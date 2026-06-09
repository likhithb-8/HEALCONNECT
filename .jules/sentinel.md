## 2025-05-14 - [Hardcoded Admin Registration Secret]
**Vulnerability:** A hardcoded secret string ("HEALCONNECT2024") was used in `pages/signup.js` to authorize administrative account registrations.
**Learning:** Hardcoding administrative secrets in client-side code exposes them via source control and browser inspection, allowing unauthorized users to gain elevated privileges.
**Prevention:** Always use environment variables for secrets and authentication codes. For sensitive operations like admin registration, the validation should ideally occur on a secure backend or via server-side logic to prevent exposure to the client.
