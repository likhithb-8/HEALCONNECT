## 2025-05-15 - Avoiding Interval Churn in Real-time Components
**Learning:** In React components that use `setInterval` for high-frequency updates (like ECG monitors), including state or props in the `useEffect` dependency array causes the interval to be cleared and recreated on every update. This leads to "interval churn" and inconsistent timing.
**Action:** Use `useRef` to track fast-changing external data and functional updates (`setECGData(prev => ...)`) to keep the effect dependency array empty, ensuring a single stable interval for the component's lifecycle.

## 2025-05-15 - Memoizing Real-time Analysis Components
**Learning:** Components that perform O(n) array operations (like filtering history) or multiple status checks on every render can significantly impact performance when embedded in live monitoring views that "tick" every 2-3 seconds.
**Action:** Use `useMemo` to wrap expensive analysis logic in real-time dashboards, ensuring they only re-compute when the underlying data (current vitals or history) actually changes.

## 2025-05-15 - Eliminating Redundant Renders for Derived State
**Learning:** Using `useEffect` to sync state based on other state or props (like calculating a `criticalAlert` based on `currentVitals`) triggers a second render cycle immediately after the first.
**Action:** Replace `useEffect` + `useState` with `useMemo` for derived UI logic to compute values during the initial render and eliminate unnecessary updates.

## 2025-05-15 - Consolidating High-Frequency State Updates
**Learning:** Updating multiple independent states (e.g., `data` and `status`) within a single real-time stream listener (like Firestore's `onSnapshot`) triggers multiple React render cycles per data packet.
**Action:** Consolidate related stream data into a single state object to ensure only one render occurs per update, significantly reducing CPU usage during high-frequency monitoring.

## 2025-05-15 - Hoisting Static Waveform Patterns
**Learning:** Defining large pulse waveform arrays inside a high-frequency `setInterval` (e.g., every 100ms) causes massive heap allocation and garbage collection pressure, as the array and its contained objects are recreated 10 times per second.
**Action:** Hoist static waveform offsets and Y-values outside the component. Use `.map()` on the static array once per tick to apply the current timestamp, drastically reducing memory churn.
