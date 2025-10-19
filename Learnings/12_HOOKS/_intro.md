**1. What Are Hooks?**

Hooks are special functions that let you “hook into” React’s features (like state, lifecycle, and context) without using class components.
Introduced in React v16.8 to make functional components powerful and stateful.

**2. Why Hooks?**

Before Hooks → only class components could manage state & lifecycle.
After Hooks → functional components can do everything classes can (and cleaner).

Advantages:
- Simpler syntax
- Reusable logic via custom hooks
- Easier testing and readability
- No need for `this`



**3. Rules of Hooks**

Only call Hooks at the top level (not inside loops, conditions, or nested functions).
Only call Hooks inside React functions (functional components or custom hooks).
React uses call order to link hooks to components — breaking these rules causes bugs.1

**4. Commonly Used Built-in Hooks**
useState: Manage state in functional components.
useEffect: Handle side effects (data fetching, subscriptions).
useContext: Access context values.
useReducer: Manage complex state logic.
useRef: Access mutable values or DOM elements.
useCallback: Memoize functions to prevent unnecessary re-renders.
useMemo: Memoize expensive calculations.
useLayoutEffect: Similar to useEffect but runs synchronously after DOM mutations.

**5. Custom Hooks**
Create your own hooks to encapsulate reusable logic.
Start with "use" (e.g., useFetch, useAuth).
```jsx
function useFetch(url) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}
```
**6. Example Usage**
```jsx
import React, { useState, useEffect } from 'react';
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
export default Counter;
```
In this example, the `Counter` component uses the `useState` hook to manage the count state and the `useEffect` hook to update the document title whenever the count changes.

## Summary
Hooks revolutionized React by enabling stateful logic in functional components, promoting code reuse, and simplifying component structures. They are now the preferred way to build React applications.
