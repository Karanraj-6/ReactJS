## useContext Hook
The `useContext` hook in React allows you to access the value of a context directly within functional components. It provides a way to share values (like themes, user information, or settings) across the component tree without having to pass props down manually at every level. This is particularly useful for managing global state or configurations in a React application.
### Syntax
```jsx
const value = useContext(MyContext);
```

- `MyContext`: The context object created using `React.createContext()`.
- `value`: The current context value, which is determined by the nearest `<MyContext.Provider>` in the component tree.

### Example
```jsx
import React, { createContext, useContext } from 'react';

const MyContext = createContext();

function MyProvider({ children }) {
  const value = 'Hello, World!';
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

function MyComponent() {
  const contextValue = useContext(MyContext);
  return <div>{contextValue}</div>;
}

function App() {
  return (
    <MyProvider>
      <MyComponent />
    </MyProvider>
  );
}

export default App;
```
In this example, we create a context called `MyContext` and a provider component `MyProvider` that supplies a value to the context. The `MyComponent` uses the `useContext` hook to access the context value and display it.

### When to Use useContext
- To avoid prop drilling when you need to pass data through many levels of components.
- To manage global state or configurations that need to be accessed by multiple components.
- To share themes, user authentication status, or localization settings across the app.

### Combining useContext with useState
You can combine `useContext` with `useState` to create a more dynamic context that can be updated by components consuming the context.

```jsx
import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

function MyProvider({ children }) {
  const [value, setValue] = useState('Hello, World!');
  return <MyContext.Provider value={{ value, setValue }}>{children}</MyContext.Provider>;
}

function MyComponent() {
  const { value, setValue } = useContext(MyContext);
  return (
    <div>
      <div>{value}</div>
      <button onClick={() => setValue('Hello, React!')}>Change Context</button>
    </div>
  );
}

function App() {
  return (
    <MyProvider>
      <MyComponent />
    </MyProvider>
  );
}

export default App;

```
In this example, the context provides both a value and a function to update that value. The `MyComponent` can change the context value by calling `setValue`, demonstrating how `useContext` can be used in conjunction with `useState` to create interactive and dynamic contexts.
In this example, the `Counter` component uses the `useState` hook to manage the count state. When the button is clicked, the `setCount` function is called with a function that receives the previous state (`prevCount`) and returns the new state (`prevCount + 1`). This ensures that the state update is based on the most recent value of `count`, preventing potential issues with stale state when multiple updates occur in quick succession.

### Summary
The `useContext` hook is a powerful tool in React for accessing context values within functional components. It helps to avoid prop drilling and allows for easier management of global state or configurations. By combining `useContext` with `useState`, you can create dynamic contexts that can be updated by consuming components, enhancing the interactivity of your React applications.
In summary, the `useContext` hook provides a straightforward way to consume context values in functional components, promoting cleaner and more maintainable code in React applications.