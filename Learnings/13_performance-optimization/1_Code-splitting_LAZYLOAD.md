## What is Code Splitting?

Code Splitting in React means dividing your JavaScript bundle into smaller chunks that can be loaded on demand. This helps improve the initial load time of your application by only loading the code that is necessary for the current view, rather than loading the entire application at once.

## Why Use Code Splitting?
- **Improved Performance**: By loading only the necessary code, you can reduce the initial load time of your application, leading to a better user experience.
- **Reduced Bundle Size**: Smaller bundles mean less data to download, which is especially important
    for users on slow networks or mobile devices.
- **Faster Time to Interactive**: Users can start interacting with your application sooner, as the critical parts of your app are loaded first.
- **Better Resource Management**: Code splitting allows you to manage resources more efficiently by loading code only when it is needed.

Imagine a React app with:
- 10 pages
- 50 components
- 5 large libraries
If you bundle everything together:
- Users download all 10 MB at once
- Most of it is not needed immediately
- Leads to slow load times, especially on mobile or slow networks
Code splitting solves this by lazy loading only what’s needed.

Without code splitting:

```App bundle → everything (all components, all routes, libraries)```

With code splitting:

```Main bundle → only critical code
Route bundle → loaded only when route visited
Component bundle → loaded only when component is rendered
```


## Lazy Loading
Lazy loading is a technique used in code splitting where certain parts of your application are loaded only when they are needed. In React, this is typically done using the `React.lazy` function along with the `Suspense` component.

```jsx
import React, { Suspense, lazy } from 'react';
const LazyComponent = lazy(() => import('./LazyComponent'));
function App() {
  return (
    <div>
      <h1>Main App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
export default App;
```
In this example:
- `React.lazy` is used to dynamically import the `LazyComponent`.
- The `Suspense` component provides a fallback UI (like a loading spinner) while the lazy component is being loaded.

In web apps, this often applies to:
- React components
- Images
- Modules
Goal: Reduce initial load time and improve performance.

**Image: Lazy Loading**
```<img src="large-image.jpg" loading="lazy" alt="Lazy Image" />```
- Browser only loads the image when it comes into viewport.
- Saves bandwidth and speeds up page load.

### Comparison: Regular Import vs Lazy Loading

| Feature     | Regular Import                    | Lazy Loading                                      |
| ----------- | --------------------------------- | ------------------------------------------------- |
| When loaded | Immediately on page load          | Only when component renders                       |
| Bundle size | All components in main bundle     | Smaller initial bundle                            |
| React usage | `import Profile from './Profile'` | `const Profile = lazy(() => import('./Profile'))` |
| UI handling | No fallback                       | Fallback UI via `Suspense`                        |


## How to Implement Code Splitting in React
React provides built-in support for code splitting using dynamic `import()` statements and the `React.lazy` function. Here are some common ways to implement code splitting in a React application:

### 1. React.lazy and Suspense
You can use `React.lazy` to dynamically import a component and `Suspense` to show a fallback UI while the component is loading.
```jsx
import React, { Suspense, lazy } from 'react';

// Lazy load component
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <div>
      <h1>Main App</h1>
      <Suspense fallback={<div>Loading Profile...</div>}>
        <Profile />
      </Suspense>
    </div>
  );
}
export default App;
```
Here, lazy(() => import(...)) → React will load the component dynamically when rendered
Suspense → shows a fallback UI while the chunk is being loaded

Internal Mechanism:
React creates a promise for the dynamic import
React pauses rendering that component until the promise resolves
Once loaded, React injects the component into the DOM

### 2. Route-Based Code Splitting
You can also implement code splitting at the route level using libraries like React Router.
```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
```
In this example, the `Home` and `About` components are loaded only when their respective routes are accessed, reducing the initial bundle size.
- Only the current route’s JS is loaded
- Other routes are downloaded when navigated to
This reduces initial bundle size drastically.



### 2. Dynamic Imports
You can also use dynamic imports directly within your components to load modules on demand.
```jsx
import React, { useState } from 'react';
function App() {
  const [Component, setComponent] = useState(null);

  const loadComponent = async () => {
    const { default: LoadedComponent } = await import('./HeavyComponent');
    setComponent(() => LoadedComponent);
  };
  return (
    <div>
      <h1>Main App</h1>
      <button onClick={loadComponent}>Load Heavy Component</button>
      {Component && <Component />}
    </div>
  );
}
export default App;
```
In this example, the `HeavyComponent` is only loaded when the user clicks the button, which helps keep the initial bundle size smaller.

### How React & Webpack Handle It

Webpack analyzes import() calls and splits the code into separate JS chunks.

When a chunk is needed:
Browser requests it
React renders the component after chunk loads
Caching: Chunks are cached, so next visit is faster

Internally (simplified pseudo-code):
```js
const LazyComponent = React.lazy(() => import('./MyComponent'));

// React renders
Suspense fallback -> "Loading..."
-> import('./MyComponent').then(module => {
      resolve(LazyComponent)
});
```
### Best Practices for Code Splitting
- Split at logical boundaries (routes, large components)
- Use meaningful chunk names for easier debugging
- Monitor bundle sizes with tools like Webpack Bundle Analyzer
- Test performance impact on different network conditions
- Consider server-side rendering implications
- Avoid over-splitting which can lead to too many requests
- Use preloading or prefetching for critical chunks
- **Next.js**: Handles page-level code splitting automatically
### Tools to Analyze Bundle Size
- Webpack Bundle Analyzer
- Source Map Explorer
- React DevTools Profiler
These tools help visualize your bundle and identify large dependencies or components that can be optimized further.

### Summary Table

| Concept       | Description                                       |
| ------------- | ------------------------------------------------- |
| **Goal**      | Reduce initial bundle size and improve load speed |
| **Tools**     | `React.lazy`, `Suspense`, dynamic `import()`      |
| **Level**     | Component-level or Route-level splitting          |
| **Mechanism** | JS chunks loaded only when needed                 |
| **Benefit**   | Faster initial load, reduced memory, smoother UX  |
| **Next.js**   | Built-in automatic page-level code splitting      |

