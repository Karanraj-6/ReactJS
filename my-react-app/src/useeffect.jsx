import React, { useState, useEffect } from 'react';

/*
  useEffect Hook – Purpose & Use Cases

  React's useEffect() allows you to perform side effects in function components.
  Common use cases include:
  - Fetching data from an API
  - Setting up subscriptions or timers
  - Manually updating the DOM
  - Cleaning up before unmounting (optional)

  useEffect Variants:

  1️.useEffect(() => { ... })
     → Runs after every render (both initial and re-renders)

  2.useEffect(() => { ... }, [])
     → Runs only once after the initial render (mount)
     → Great for API calls, initializing app state, etc.

  3️. useEffect(() => { ... }, [dependency])
     → Runs only when the specified dependency value changes
     → Useful for watching and responding to changes in specific state/props
*/

function EffectDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Karan');

  //Runs after every render (initial + any update)
  useEffect(() => {
    console.log('🌀 This runs after every render');
  });

  // Runs only once when the component is mounted
  useEffect(() => {
    console.log('This runs only once (like componentDidMount)');
    // You could fetch data from an API here
  }, []);

  //  Runs only when `count` changes
  useEffect(() => {
    console.log(`Count updated to ${count}`);
    // Example: send the count value to analytics
  }, [count]);

  return (
    <div className="container mt-4 text-center">
      <h1>useEffect Hook Demo</h1>

      <div className="mt-4">
        <h3>Hello, {name}!</h3>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="form-control w-25 mx-auto"
          placeholder="Type a new name"
        />
      </div>

      <div className="mt-4">
        <h3>Count: {count}</h3>
        <button className="btn btn-success mx-2" onClick={() => setCount(prev => prev + 1)}>Increment</button>
        <button className="btn btn-danger" onClick={() => setCount(prev => prev - 1)}>Decrement</button>
      </div>
    </div>
  );
}

export default EffectDemo;
