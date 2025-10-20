# useMemo
useMemo is a React Hook that memoizes (caches) the result of a computation so that React doesn’t recompute it on every render, unless its dependencies change. This is particularly useful for optimizing performance in functional components that perform expensive calculations.
In short: It remembers an expensive calculation between renders.

## Syntax
```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
- `computeExpensiveValue`: A function that performs the expensive calculation.
- `[a, b]`: An array of dependencies. The memoized value will only be recomputed when one of these dependencies changes.
- `memoizedValue`: The cached result of the computation.

## Example: Expensive Calculation
```jsx
import React, { useState, useMemo } from 'react';
function ExpensiveComponent({ num }) {
  // Simulate an expensive calculation
  const computeExpensiveValue = (n) => {
    console.log('Computing expensive value...');
    let result = 0;
    for (let i = 0; i < 1e7; i++) {
      result += n;
    }
    return result;
  };

  // Memoize the expensive calculation
  const expensiveValue = useMemo(() => computeExpensiveValue(num), [num]);

  return (
    <div>
      <p>Expensive Value: {expensiveValue}</p>
    </div>
  );
}
```

## Internal Working (React Fiber Level)
At the React Fiber level, each component instance has a linked list of "hooks" associated with it. When you call `useMemo`, React creates a new hook object that stores the memoized value and its dependencies. This hook object is stored in the component's hook list.
When the component re-renders, React retrieves the same hook object from the list. It then compares the current dependencies with the previous ones:
- If the dependencies have changed, React calls the provided function to recompute the value and updates the memoized value in the hook object.
- If the dependencies have not changed, React returns the previously memoized value without recomputing it.
This behavior ensures that expensive calculations are only performed when necessary, improving the performance of the component.

When React renders a component that uses useMemo, it allocates a “hook node” in the fiber’s hook list like this:
```jsx
// Simplified pseudo structure
fiberNode.hooks = [
  {
    memoizedState: {
      value: computedValue,
      dependencies: [dep1, dep2]
    },
    next: ...
  }
]
```
So on every re-render:
- React retrieves this object.
- It compares the current dependencies with the previous ones.
- If they differ, it recomputes the value and updates `memoizedState.value`.
- If they are the same, it returns the cached `memoizedState.value`.
This mechanism allows React to efficiently manage expensive computations by avoiding unnecessary recalculations, thus enhancing the performance of functional components that rely on such computations.

## When to Use useMemo
- To optimize performance for expensive calculations that do not need to be recalculated on every render.
- To memoize complex objects or arrays that are used as dependencies in other hooks (like `useEffect` or `useCallback`).
- To prevent unnecessary re-renders of child components by ensuring that props remain referentially equal unless their actual values change.
- To improve performance in components that render frequently with the same data.
- To avoid recalculating values that are derived from props or state unless those inputs change.
- To optimize rendering of lists or tables where the data is derived from complex calculations.
- To enhance performance in scenarios where functions are passed as props to child components, ensuring that the function references remain stable unless their dependencies change.
- To cache results of computations that involve heavy data processing, such as filtering or sorting large datasets.
- To improve performance in scenarios where components rely on derived state that is computed from multiple sources, ensuring that the derived state is only recalculated when its dependencies change.

## drawbacks of overusing useMemo
- **Increased Complexity**: Overusing `useMemo` can make the code harder to read and maintain, as it introduces additional layers of abstraction.
- **Memory Overhead**: Each memoized value consumes memory. If many values are memoized unnecessarily, it can lead to increased memory usage.
- **Premature Optimization**: Using `useMemo` without profiling can lead to premature optimization, where the performance gains are negligible compared to the added complexity.

## useMemo vs useCallback
Both `useMemo` and `useCallback` are used for memoization in React, but they serve different purposes:
| Hook                    | Returns                  | Used For                   |
| ----------------------- | ------------------------ | -------------------------- |
| `useMemo(fn, deps)`     | **Result** of a function | Memoize values             |
| `useCallback(fn, deps)` | **Function itself**      | Memoize function reference |

## Summary
`useMemo` is a powerful React Hook that helps optimize performance by memoizing the results of expensive calculations. By using `useMemo`, you can ensure that these calculations are only performed when necessary, based on changes in specified dependencies. This can lead to significant performance improvements in functional components, especially those that perform complex computations or render frequently. However, it's important to use `useMemo` judiciously to avoid unnecessary complexity and memory overhead in your code.
