# Debouncing AND Throttling
When building React applications, performance optimization is crucial for ensuring a smooth user experience. Two common techniques used to optimize performance are Debouncing and Throttling — these are essential for performance optimization, especially when handling events like scrolling, resizing, or typing.

### What They Are

Both Debouncing and Throttling control how often a function runs, but in slightly different ways:

| Concept        | What it does                                                                            |
| -------------- | --------------------------------------------------------------------------------------- |
| **Debouncing** | Waits for a **pause in events** before running the function                             |
| **Throttling** | Runs the function **at most once per fixed interval**, no matter how many events happen |

### Why They Are Important
Both techniques help to reduce the number of times a function is called, which can significantly improve performance, especially for functions that are resource-intensive or involve network requests.

Imagine you have a function attached to scroll or keypress:

```window.addEventListener('scroll', handleScroll);```
    - Without control → handleScroll can fire hundreds of times per second
    - Leads to performance issues, laggy UI, high CPU usage
Debouncing and throttling fix this.


## Debouncing
Debouncing is a technique used to limit the rate at which a function is executed. It ensures that a function is only called after a specified period of inactivity. This is particularly useful for scenarios like search input fields, where you want to wait until the user has stopped typing before making an API call.
Debouncing : Waits for a pause in events before running the function

### exaple of Debouncing in React

```jsx
import React, { useState } from 'react';

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

function Search() {
  const [query, setQuery] = useState('');

  const handleSearch = (text) => {
    console.log('Searching for', text);
  };

  const debouncedSearch = debounce(handleSearch, 500);

  return (
    <input
      type="text"
      onChange={(e) => {
        setQuery(e.target.value);
        debouncedSearch(e.target.value);
      }}
      value={query}
      placeholder="Search..."
    />
  );
}

export default Search;
```
In this example, the `debounce` function creates a debounced version of `handleSearch`. The search function will only be called 500 milliseconds after the user stops typing.

## Throttling
Throttling is another technique used to control the rate at which a function is executed. Unlike debouncing, which waits for a pause in events, throttling ensures that a function is called at most once in a specified time interval. This is useful for scenarios like window resizing or scrolling, where you want to limit how often a function runs.
Throttling : Runs the function at most once per fixed interval, no matter how many events

### Example of Throttling in React

```jsx
import React, { useEffect } from 'react';

function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return (...args) => {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

function ScrollTracker() {
  useEffect(() => {
    const handleScroll = () => {
      console.log('Scroll position:', window.scrollY);
    };

    const throttledScroll = throttle(handleScroll, 200); // max once every 200ms
    window.addEventListener('scroll', throttledScroll);

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return <div style={{ height: '2000px' }}>Scroll me!</div>;
}

export default ScrollTracker;
```
In this example, the `throttle` function creates a throttled version of `handleScroll`. The scroll function will be called at most once every 200 milliseconds, regardless of how often the user scrolls.

## Differences Between Debouncing and Throttling

| Feature               | Debounce                                  | Throttle                                |
| --------------------- | ----------------------------------------- | --------------------------------------- |
| When function runs    | After events stop firing                  | At regular intervals                    |
| Use case              | Search input, window resize, autocomplete | Scroll, mouse move, animations          |
| Effect on performance | Reduces calls after pause                 | Limits calls per interval               |
| Example               | Typing → API call after stop              | Scrolling → update position every 200ms |


