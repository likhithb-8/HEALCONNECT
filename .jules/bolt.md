## 2025-05-15 - Avoiding Interval Churn in Real-time Components
**Learning:** In React components that use `setInterval` for high-frequency updates (like ECG monitors), including state or props in the `useEffect` dependency array causes the interval to be cleared and recreated on every update. This leads to "interval churn" and inconsistent timing.
**Action:** Use `useRef` to track fast-changing external data and functional updates (`setECGData(prev => ...)`) to keep the effect dependency array empty, ensuring a single stable interval for the component's lifecycle.

## 2025-05-15 - Memoizing Real-time Analysis Components
**Learning:** Components that perform O(n) array operations (like filtering history) or multiple status checks on every render can significantly impact performance when embedded in live monitoring views that "tick" every 2-3 seconds.
**Action:** Use `useMemo` to wrap expensive analysis logic in real-time dashboards, ensuring they only re-compute when the underlying data (current vitals or history) actually changes.

## 2025-05-15 - Eliminating Redundant Renders for Derived State
**Learning:** Using `useEffect` to sync state based on other state or props (like calculating a `criticalAlert` based on `currentVitals`) triggers a second render cycle immediately after the first.
**Action:** Replace `useEffect` + `useState` with `useMemo` for derived UI logic to compute values during the initial render and eliminate unnecessary updates.

## 2026-07-02 - Memoization Stability for Prepended Lists
**Learning:** Using 'index' for Framer Motion animation delays in a memoized component (e.g., 'delay: index * 0.1') causes the entire list to re-render when a new item is prepended, as every existing item's index changes.
**Action:** Remove 'index' from memoized child props for prepended lists; use Framer Motion's 'layout' prop for smooth transitions without sacrificing reconciliation efficiency.
