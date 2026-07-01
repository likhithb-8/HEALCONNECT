## 2025-05-14 - [Hardcoded Admin Registration Secret]
**Vulnerability:** A hardcoded secret string ("HEALCONNECT2024") was used in `pages/signup.js` to authorize administrative account registrations.
**Learning:** Hardcoding administrative secrets in client-side code exposes them via source control and browser inspection, allowing unauthorized users to gain elevated privileges.
**Prevention:** Always use environment variables for secrets and authentication codes. For sensitive operations like admin registration, the validation should ideally occur on a secure backend or via server-side logic to prevent exposure to the client.

## 2025-05-15 - [Hardcoded Network and API Credentials]
**Vulnerability:** Hardcoded WiFi SSID/Password, Firebase API Key, and User Email/Password were present in the Arduino source code (`Network.cpp`) and `.env.example`.
**Learning:** Credentials committed to source control, even in example files or embedded code, are easily discoverable and can be exploited to gain unauthorized access to networks or cloud resources.
**Prevention:** Use placeholders in example files and Arduino code. Securely manage actual credentials using environment variables or separate configuration files that are excluded from version control via `.gitignore`.

## 2025-05-15 - [Redundant Insecure Duplicate Repository]
**Vulnerability:** A nested `Downloads/` directory contained a full duplicate of the project, including sensitive configuration files and potentially outdated or exposed credentials.
**Learning:** Accidental commits of temporary or local "backup" folders (like `Downloads/`) can lead to massive data leakage and increase the project's attack surface by mirroring vulnerabilities.
**Prevention:** Regularly audit the repository for unexpected directories and ensure `.gitignore` is comprehensive enough to catch common temporary locations. Use `git clean -fd` locally before pushing to identify untracked files.

## 2026-06-25 - [Missing Security Headers]
**Vulnerability:** The application was missing standard security headers (HSTS, CSP, X-Frame-Options, etc.), making it vulnerable to clickjacking, MIME-sniffing, and cross-site scripting (XSS) attacks.
**Learning:** Next.js applications require explicit configuration in `next.config.js` to implement these headers globally. A tailored Content Security Policy (CSP) is necessary to support third-party integrations like Firebase without compromising security.
**Prevention:** Implement a baseline set of security headers in all web projects. Use `headers()` in `next.config.js` to ensure they are applied to all routes.

## 2025-05-16 - [User Enumeration in Authentication Flows]
**Vulnerability:** The login and forgot password flows revealed whether an account existed by returning specific error messages ("User not found") or disclosing the username in the password reset success message.
**Learning:** Providing detailed feedback in authentication failures helps legitimate users but also assists attackers in mapping valid accounts for brute-force or social engineering attacks.
**Prevention:** Use generic error messages like "Invalid username or password" and standard success messages for password resets that do not confirm if the account exists.

## 2026-06-29 - [Mass Assignment and PII Leakage in Profile Update]
**Vulnerability:** The patient profile update logic used a spread operator (`...formData`) to merge user-supplied data into the session object stored in `localStorage`. This allowed for potential Mass Assignment/Privilege Escalation if fields like `role` were injected into the form state. Additionally, sensitive PII was being logged to the browser console.
**Learning:** In client-centric applications where `localStorage` acts as the source of truth for sessions, unrestricted object merging during updates is a high-risk pattern. Malicious users can modify client-side state to escalate privileges if the update logic doesn't use an allow-list.
**Prevention:** Always use explicit field mapping (an allow-list) when updating user session objects or profile data. Avoid using spread operators on user-controlled objects when merging into sensitive data structures. Remove all debug logs that output sensitive patient data (PII/PHI).

## 2026-07-01 - [Broken Access Control via Missing RBAC Enforcement]
**Vulnerability:** The `AuthCheck` component only verified the presence of *any* user role in `localStorage`, allowing authenticated users to access dashboards and routes restricted to other roles (e.g., a patient accessing `/admin/*`).
**Learning:** Client-side route protection must explicitly validate the user's specific role against the requested path. Relying on a binary "is authenticated" check is insufficient for multi-role applications.
**Prevention:** Implement centralized RBAC logic that maps route prefixes to required roles and enforces these checks before rendering protected components.
