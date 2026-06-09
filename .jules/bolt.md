
## 2026-06-09 - [Optimized real-time monitoring and memoized health insights]
**Learning:** Real-time components in this app (like ECGMonitor) were recreating intervals every 100ms because they had state in their dependency arrays. This causes significant performance overhead and jitter. Functional state updates and useRef are essential for stable real-time loops.
**Action:** Use functional state updates and useRef to track changing external data without resetting interval loops in monitoring components.
