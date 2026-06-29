## 2025-05-15 - Avoiding Interval Churn in Real-time Components
**Learning:** In React components that use `setInterval` for high-frequency updates (like ECG monitors), including state or props in the `useEffect` dependency array causes the interval to be cleared and recreated on every update. This leads to "interval churn" and inconsistent timing.
**Action:** Use `useRef` to track fast-changing external data and functional updates (`setECGData(prev => ...)`) to keep the effect dependency array empty, ensuring a single stable interval for the component's lifecycle.

## 2025-05-15 - Memoizing Real-time Analysis Components
**Learning:** Components that perform O(n) array operations (like filtering history) or multiple status checks on every render can significantly impact performance when embedded in live monitoring views that "tick" every 2-3 seconds.
**Action:** Use `useMemo` to wrap expensive analysis logic in real-time dashboards, ensuring they only re-compute when the underlying data (current vitals or history) actually changes.

## 2025-05-15 - Eliminating Redundant Renders for Derived State
**Learning:** Using `useEffect` to sync state based on other state or props (like calculating a `criticalAlert` based on `currentVitals`) triggers a second render cycle immediately after the first.
**Action:** Replace `useEffect` + `useState` with `useMemo` for derived UI logic to compute values during the initial render and eliminate unnecessary updates.

## 2025-05-15 - Optimizing Static Object Re-allocation
**Learning:** Hoisting static mappings (like status-to-class maps) outside of components and using `useMemo` for derived view models (like summary cards) prevents redundant memory allocations and shallow comparison failures during React re-renders.
**Action:** Always identify and hoist static configuration objects and memoize complex derived arrays/objects in dashboard-style components.

## 2025-05-15 - Improving LCP with Image Sizes
**Learning:** Next.js images with `fill` layout default to `100vw`, which can cause significant LCP delays as browsers download original-sized images.
**Action:** Use a precise `sizes` attribute that matches the grid layout to help the browser choose the optimal source from the `srcset`.
