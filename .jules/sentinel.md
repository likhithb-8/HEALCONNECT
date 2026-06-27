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
**Vulnerability:** The login and forgot-password flows provided specific feedback that allowed attackers to distinguish between registered and unregistered users. The forgot-password flow also leaked account usernames.
**Learning:** Detailed error messages intended to be "helpful" for users can be exploited for reconnaissance. Standardizing responses across success and failure paths for sensitive operations is essential for privacy and security.
**Prevention:** Implement generic error messages for authentication failures (e.g., "Invalid username or password"). For password recovery, provide a uniform confirmation message regardless of whether the account exists, and avoid leaking internal identifiers like usernames in the public response.
