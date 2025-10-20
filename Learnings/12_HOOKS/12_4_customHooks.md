## What are Custom Hooks?
Custom Hooks are JavaScript functions that start with "use" and allow you to reuse stateful logic across multiple components in React. They enable you to extract component logic into reusable functions, making your code cleaner and more maintainable.
Custom Hooks are your own reusable functions that use React’s built-in hooks (useState, useEffect, etc.) to share logic across components — without repeating code.
In short: You make your own hook when you notice you’re copying the same logic in multiple components.

### Why Custom Hooks Exist?
Custom Hooks exist to promote code reuse and separation of concerns in React applications. They allow developers to encapsulate complex logic and state management into a single function that can be easily shared across different components. This leads to cleaner, more modular code and helps avoid duplication.

Before Hooks, if two components needed the same logic (e.g., fetching data, tracking mouse position), you had to use:
- Higher Order Components (HOCs)
- Render Props
Both made the code nest-y and harder to read. Now, with Hooks, we can simply extract logic into a function and reuse it — that’s a Custom Hook

## Syntax & Rule
Custom Hooks are regular JavaScript functions that follow these rules:
1. The function name must start with "use" (e.g., useFetch, useCounter).
2. They can call other Hooks (built-in or custom) inside them.
3. They must follow the same rules as regular Hooks (only call Hooks at the top level and from React functions).
### Example of a Custom Hook
```jsx
import { useState, useEffect } from 'react';
function useMyCustomHook() {
  // use built-in hooks inside
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  // return what you want to expose
  return { count, setCount };
}

function MyComponent() {
  const { count, setCount } = useMyCustomHook();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
export default MyComponent;
```
In this example, `useMyCustomHook` is a custom hook that manages a `count` state and logs changes to the console. The `MyComponent` uses this custom hook to access the `count` and `setCount` function.

### Example: useFetch Hook

```jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;

    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Network error");
        const json = await res.json();
        if (!cancel) setData(json);
      } catch (err) {
        if (!cancel) setError(err);
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    fetchData();

    return () => { cancel = true; }; // cleanup to avoid memory leak
  }, [url]);

  return { data, loading, error };
}
function DataDisplay({ url }) {
  const { data, loading, error } = useFetch(url);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
export default DataDisplay;
```
In this example, `useFetch` is a custom hook that fetches data from a given URL and manages loading and error states. The `DataDisplay` component uses this hook to display the fetched data.

### other Examples of Custom Hooks

| Hook Name         | Purpose                                |
| ----------------- | -------------------------------------- |
| `useToggle`       | Manage boolean states (like show/hide) |
| `useLocalStorage` | Sync state with localStorage           |
| `useWindowSize`   | Track window resize                    |
| `useDebounce`     | Delay execution (e.g., search input)   |
| `useTheme`        | Manage dark/light theme                |
| `usePrevious`     | Store previous value of a variable     |



### When to Use Custom Hooks
- When you have reusable logic that needs to be shared across multiple components.
- When you want to separate concerns and keep your components clean and focused on rendering.
- When you want to encapsulate complex state management or side effects.

### Benefits of Custom Hooks
- **Reusability**: Write logic once and use it in multiple components.
- **Separation of Concerns**: Keep components focused on rendering while moving logic to hooks.
- **Readability**: Improve code organization and make it easier to understand.
- **Testability**: Easier to test logic in isolation from components.

### Summary
Custom Hooks are a powerful feature in React that allows you to extract and reuse stateful logic across
multiple components. By following the rules of Hooks and encapsulating logic into functions that start with "use," you can create cleaner, more maintainable, and reusable code in your React applications.

**Notes**
React’s “Rules of Hooks” system relies on the naming convention of functions to identify which ones are hooks.
When React renders your component, it tracks the order of hook calls
(useState, useEffect, etc.) using an internal mechanism called the React Fiber tree.

React needs to know:
Which component is calling the hook.
In what order hooks appear (so React can map states correctly).
If React allowed hooks to be called from any random function,
it would have no idea which component those hook calls belong to.
That would break the internal hook-to-component mapping.
So React uses a naming convention and linter rule to detect custom hooks:
Any function that starts with use and is called inside a component or another hook
is treated as part of the React render lifecycle.
Everything else (like fetchData) is ignored.

React internally checks:

When your component runs, React’s runtime roughly does something like this (conceptually):

```js
// pseudo React runtime
if (functionName.startsWith("use")) {
  // Register hooks for current fiber
  ReactCurrentDispatcher.current = hookDispatcher;
} else {
  // Treat as normal JS function
  ReactCurrentDispatcher.current = null;
}
```
So in the case of:
useFetch() → React tracks this hook call.
fetchData() → React ignores this; invalid hook call.
