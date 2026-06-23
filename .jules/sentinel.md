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

## 2026-06-23 - [User Enumeration and Information Leakage in Login/Reset Flows]
**Vulnerability:** The login flow returned distinct errors for missing users ("User not found") vs. wrong passwords, and the forgot password flow revealed username data and email existence.
**Learning:** Explicit feedback on account existence allows attackers to harvest valid credentials through brute-force or enumeration attacks.
**Prevention:** Use generic error messages (e.g., "Invalid username or password") and consistent responses for password resets regardless of whether the target account exists.
