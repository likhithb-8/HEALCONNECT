## 2025-05-15 - Avoiding Interval Churn in Real-time Components
**Learning:** In React components that use `setInterval` for high-frequency updates (like ECG monitors), including state or props in the `useEffect` dependency array causes the interval to be cleared and recreated on every update. This leads to "interval churn" and inconsistent timing.
**Action:** Use `useRef` to track fast-changing external data and functional updates (`setECGData(prev => ...)`) to keep the effect dependency array empty, ensuring a single stable interval for the component's lifecycle.

## 2025-05-15 - Memoizing Real-time Analysis Components
**Learning:** Components that perform O(n) array operations (like filtering history) or multiple status checks on every render can significantly impact performance when embedded in live monitoring views that "tick" every 2-3 seconds.
**Action:** Use `useMemo` to wrap expensive analysis logic in real-time dashboards, ensuring they only re-compute when the underlying data (current vitals or history) actually changes.

## 2026-06-25 - Eliminating Redundant Renders in Patient Monitoring
**Learning:** Using `useEffect` to update state based on other state/props (e.g., deriving `criticalAlert` from `currentHeartRate`) triggers a second render cycle. Transitioning this to `useMemo` eliminates the redundant render while keeping the UI in sync. Additionally, referential instability of objects passed to memoized children (like `currentVitals` to `HealthInsights`) breaks `React.memo`.
**Action:** Prefer `useMemo` for derived UI states and stabilize object props with `useMemo` when passing them to `React.memo` optimized components.
