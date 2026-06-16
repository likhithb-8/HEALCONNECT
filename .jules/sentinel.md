## 2025-05-14 - [Hardcoded Admin Registration Secret]
**Vulnerability:** A hardcoded secret string ("HEALCONNECT2024") was used in `pages/signup.js` to authorize administrative account registrations.
**Learning:** Hardcoding administrative secrets in client-side code exposes them via source control and browser inspection, allowing unauthorized users to gain elevated privileges.
**Prevention:** Always use environment variables for secrets and authentication codes. For sensitive operations like admin registration, the validation should ideally occur on a secure backend or via server-side logic to prevent exposure to the client.

## 2025-05-15 - [Hardcoded Secrets in Hardware Firmware]
**Vulnerability:** The Arduino/ESP32 firmware code in `HealthConnect_Kit_Arduino_Code/Network.cpp` contains hardcoded WiFi credentials (SSID/Password) and Firebase authentication secrets (API Key, Project ID, User Email/Password).
**Learning:** Hardcoding credentials in source files that are committed to version control exposes them to anyone with access to the repository, potentially compromising the entire health monitoring infrastructure.
**Prevention:** Use a separate configuration file (like `secrets.h`) that is excluded from version control via `.gitignore`, or use a provisioning system to inject credentials at runtime.
