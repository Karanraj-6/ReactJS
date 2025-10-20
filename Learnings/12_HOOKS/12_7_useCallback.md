# useCallback
The `useCallback` hook in React is used to memoize functions, preventing them from being recreated on every render unless their dependencies change. This is particularly useful when passing functions as props to child components, as it helps avoid unnecessary re-renders of those components.
### Syntax
```jsx
const memoizedCallback = useCallback(
  () => {
    // Your function logic here
  },
  [dependency1, dependency2], // dependencies array
);
```
- `memoizedCallback`: The memoized version of the function.
- `() => { ... }`: The function you want to memoize.    
- `[dependency1, dependency2]`: An array of dependencies. The function will only be recreated if one of these dependencies changes.

### Example
```jsx
import React, { useState, useCallback } from 'react';
function MyComponent() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []); // No dependencies, so the function is created only once

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
export default MyComponent;
```
In this example, the `increment` function is memoized using `useCallback`. Since it has an empty dependency array, it will only be created once when the component mounts. This prevents unnecessary re-creations of the function on subsequent renders.

### Example: Preventing Unnecessary Child Re-renders
```jsx
import React, { useState, useCallback } from 'react';
const ChildComponent = React.memo(({ onClick }) => {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click Me</button>;
});
function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // No dependencies, so the function is created only once

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}
export default ParentComponent;
```
In this example, the `ChildComponent` is wrapped with `React.memo`, which prevents it from re-rendering unless its props change. The `handleClick` function in the `ParentComponent` is memoized using `useCallback`, ensuring that it maintains the same reference across renders. As a result, when the count is incremented, the `ChildComponent` does not re-render, demonstrating the effectiveness of `useCallback` in optimizing component performance.

### Internal Working (React Fiber Level)
At the React Fiber level, each component instance has a linked list of "hooks" associated with it. When you call `useCallback`, React creates a new hook object that stores the memoized function and its dependencies. This hook object is stored in the component's hook list.

When the component re-renders, React retrieves the same hook object from the list. It then compares the current dependencies with the previous ones:
- If the dependencies have changed, React creates a new function and updates the memoized function in the hook object.
- If the dependencies have not changed, React returns the previously memoized function without recreating it
This behavior ensures that functions are only recreated when necessary, improving the performance of the component.

When React renders a component that uses useCallback, it allocates a “hook node” in the fiber’s hook list like this:
```jsx
// Simplified pseudo structure
fiberNode.hooks = [
  {
    memoizedState: {
      callback: memoizedFunction,
      dependencies: [dep1, dep2]
    },
    next: ...
  }
]
```
So on every re-render:
- React retrieves this object.
- It compares the current dependencies with the previous ones.
- If they differ, it creates a new function and updates `memoizedState.callback`.
- If they are the same, it returns the cached `memoizedState.callback`.
This mechanism allows React to efficiently manage function references by avoiding unnecessary recreations, thus enhancing the performance of functional components that rely on such functions.

### When to Use useCallback
- When passing functions as props to child components that rely on reference equality to prevent unnecessary re-renders (e.g., when using `React.memo`).
- To optimize performance in components that have expensive computations or side effects triggered by function changes.
- When you want to ensure that a function maintains the same reference across renders unless specific dependencies change.

### drawbacks
- Overuse of `useCallback` can lead to more complex code and may not always result in performance improvements. It's essential to measure and determine if memoization is beneficial in your specific use case.
- It adds some overhead due to the dependency checking on each render, so it should be used judiciously.

### Summary
The `useCallback` hook is a powerful tool in React for memoizing functions, helping to optimize performance by preventing unnecessary re-creations of functions. By understanding its behavior and use cases, you can effectively utilize `useCallback` to enhance the efficiency of your React applications.


# React.Memo
React.memo is a higher-order component that memoizes a functional component, preventing it from re-rendering unless its props change. It is used to optimize performance by avoiding unnecessary renders of components that do not need to update when their parent component re-renders.

```jsx
import React from 'react';
const MyComponent = React.memo(({ value }) => {
  console.log('MyComponent rendered');
  return <div>{value}</div>;
});
function ParentComponent() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <MyComponent value="Hello, World!" />
    </div>
  );
}
export default ParentComponent;
```
In this example, `MyComponent` is wrapped with `React.memo`, which prevents it from re-rendering unless its `value` prop changes. When the `ParentComponent` increments the count, `MyComponent` does not re-render, demonstrating the effectiveness of `React.memo` in optimizing component performance.

### When to Use React.memo
- To optimize functional components that receive props and do not need to re-render unless those props change.
- When you have components that are expensive to render and their props change infrequently.
- To prevent unnecessary re-renders in components that are part of a larger component tree.

### Summary
`React.memo` is a useful tool for optimizing functional components in React by memoizing them and
preventing unnecessary re-renders. By using `React.memo`, you can enhance the performance of your React applications, especially in scenarios where components receive props that change infrequently.
