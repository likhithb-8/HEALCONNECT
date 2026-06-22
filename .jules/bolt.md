## 2025-05-15 - Avoiding Interval Churn in Real-time Components
**Learning:** In React components that use `setInterval` for high-frequency updates (like ECG monitors), including state or props in the `useEffect` dependency array causes the interval to be cleared and recreated on every update. This leads to "interval churn" and inconsistent timing.
**Action:** Use `useRef` to track fast-changing external data and functional updates (`setECGData(prev => ...)`) to keep the effect dependency array empty, ensuring a single stable interval for the component's lifecycle.

## 2025-05-15 - Memoizing Real-time Analysis Components
**Learning:** Components that perform O(n) array operations (like filtering history) or multiple status checks on every render can significantly impact performance when embedded in live monitoring views that "tick" every 2-3 seconds.
**Action:** Use `useMemo` to wrap expensive analysis logic in real-time dashboards, ensuring they only re-compute when the underlying data (current vitals or history) actually changes.

## 2025-05-15 - React Reconciliation vs. Sequential Animation
**Learning:** In dynamic lists using Framer Motion staggered animations (e.g., `delay: index * 0.1`), it's essential to keep the `index` in the map callback to preserve visual effects while switching to stable, unique keys (like `record.date`) for React's reconciliation. Using only indices as keys can cause redundant re-renders and broken animations during list updates.
**Action:** Always use stable unique IDs for keys in real-time lists, but pass the array index to animation props to maintain sequential visual feedback.
