# useRef
useRef is a React Hook that lets you store a mutable value that persists across re-renders — without causing a re-render.
It's often used to directly access and interact with DOM elements, but it can also hold any mutable value, similar to an instance variable in class components.
It gives you an object like this:

```{ current: initialValue }```
This object is stable (same reference across renders), and React never reinitializes it.

## Syntax
```jsx
const refContainer = useRef(initialValue);
```
- `initialValue`: The initial value you want to store in the ref. This can be any type (object, number, string, etc.).
- `refContainer`: An object with a `current` property that holds the mutable value.

## Example: Accessing DOM Elements
```jsx
import React, { useRef } from 'react';
function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  const handleClick = () => {
    // Accessing the DOM element and focusing it
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus the input</button>
    </div>
  );
}
export default TextInputWithFocusButton;
```
In this example, `useRef` is used to create a reference to the input element. When the button is clicked, the input field is focused using the `focus()` method on the DOM element.

## Example: Storing Mutable Values
```jsx
import React, { useRef, useState } from 'react';
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current !== null) return; // Prevent multiple intervals
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
export default Timer;
```
In this example, `useRef` is used to store the interval ID for the timer. This allows us to start and stop the timer without causing re-renders when the interval ID changes.

## Internal Working (React Fiber level)
At the React Fiber level, each component instance has a linked list of "hooks" associated with it. When you call `useRef`, React creates a new hook object with a `current` property initialized to the provided `initialValue`. This hook object is stored in the component's hook list.
When the component re-renders, React retrieves the same hook object from the list, ensuring that the `current` property retains its value across renders. Since updating the `current` property does not trigger a re-render, it allows you to store mutable values efficiently.
This behavior is particularly useful for scenarios where you need to keep track of values that don't directly affect the UI, such as timers, previous state values, or DOM element references.

When React renders a component that uses useRef, it allocates a “hook node” in the fiber’s hook list like this:
```jsx
// Simplified pseudo structure
fiberNode.hooks = [
  {
    memoizedState: { current: initialValue },
    next: ...
  }
]
```
So on every re-render:
- React doesn’t recreate this object.
- It just gives you the same reference (refObject) again.
- You can mutate refObject.current freely — React won’t schedule a re-render.

## Differences between useRef and useState

| Feature                      | `useState`   | `useRef`           |
| ---------------------------- | ------------ | ------------------ |
| Triggers re-render on change |  Yes         |  No                |
| Keeps value across renders   |  Yes         |  Yes               |
| Mutable directly             |  No          |  Yes (`.current`)  |
| Used for DOM access          |  No          |  Yes               |
| Used for storing timers, IDs |  Sometimes   |  Perfectly         |

## Internally (Conceptual React Pseudocode)
```jsx
function useRef(initialValue) {
  const hook = resolveHook(); // get current hook slot in fiber
  if (!hook.memoizedState) {
    hook.memoizedState = { current: initialValue };
  }
  return hook.memoizedState; // always same object
}
```
That’s why React always returns the same reference, never a new one.

## When to Use useRef
- To access and manipulate DOM elements directly.
- To store mutable values that do not require re-rendering when changed (e.g., timers, IDs).
- To keep track of previous state or props without causing re-renders.
- To integrate with third-party libraries that require direct DOM manipulation.

## Summary
The `useRef` hook is a powerful tool in React for managing mutable values and accessing DOM elements without causing unnecessary re-renders. By understanding its behavior and use cases, you can effectively utilize `useRef` to enhance the performance and functionality of your React applications.   
