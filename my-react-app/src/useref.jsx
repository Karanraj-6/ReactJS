/*
  useRef Hook – Purpose & Use Cases

  useRef() returns a mutable object whose `.current` property persists across renders.
  Unlike state, changing `.current` does NOT trigger a re-render.

  Common Use Cases:
  - Accessing & manipulating DOM elements directly (like focusing input)
  - Storing mutable values without causing re-renders
  - Holding previous values (e.g. previous state or props)
  - Building timers, intervals, and managing scroll positions, animations, etc.
  - Keeping any value that should not trigger a re-render when changed

  Structure:
    const ref = useRef(initialValue);

    - ref.current holds the value.
    - You can read/write to it directly without triggering re-renders.
*/



import React, { useRef, useState, useEffect } from 'react';

function UseRefDemo() {
  const inputRef = useRef(null); // DOM access
  const countRef = useRef(0);    // persistent value
  const [count, setCount] = useState(0); // regular state

  useEffect(() => {
    // Auto-focus input field on first render
    inputRef.current.focus();
  }, []);

  const handleClick = () => {
    countRef.current += 1; // This does NOT re-render
    setCount(prev => prev + 1); // This DOES re-render
  };

  return (
    <div className="text-center mt-5">
      <h2>🔍 useRef Demo</h2>

      <input ref={inputRef} type="text" placeholder="Auto-focused input" className="form-control w-50 mx-auto mb-3" />

      <p>🔁 useRef Count (no re-render): {countRef.current}</p>
      <p>🔁 useState Count (re-renders): {count}</p>

      <button onClick={handleClick} className="btn btn-warning">Click Me</button>
    </div>
  );
}

export default UseRefDemo;
