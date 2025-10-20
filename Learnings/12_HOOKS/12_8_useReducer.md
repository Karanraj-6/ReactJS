# useReducer
The `useReducer` hook is an alternative to `useState` for managing complex state logic in React functional components. It is particularly useful when the state depends on previous state values or when the state logic involves multiple sub-values.
### Syntax
```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```
- `reducer`: A function that determines how the state should change based on the current state and an action. It takes two arguments: the current state and an action object, and returns the new state.
- `initialState`: The initial value of the state.
- `state`: The current state value.
- `dispatch`: A function that you call with an action object to trigger a state change.

### Example
```jsx
import React, { useReducer } from 'react';
const initialState = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
}
export default Counter;
```
In this example, we define a `reducer` function that handles two action types: `increment` and `decrement`. The `Counter` component uses the `useReducer` hook to manage the count state. When the buttons are clicked, the `dispatch` function is called with the appropriate action, which updates the state accordingly.

## How It Works (Step-by-Step)

- 1.Initialization
    ```React calls useReducer(reducer, {count: 0}). It sets state = {count: 0} and gives you a dispatch function.```

- 2.Dispatch Action
    When you click a button, React calls:

    ```dispatch({ type: 'increment' });```

- 3.Reducer Execution
    React runs your reducer:
    ```reducer({count: 0}, {type: 'increment'}) → {count: 1}```

- 4.Re-render
    React updates the component with the new state ({count: 1}).
    The UI re-renders to show the latest state.count.

## Internal Working (React Fiber Level)
At the React Fiber level, each component instance has a linked list of "hooks" associated with it. When you call `useReducer`, React creates a new hook object that stores the current state and the reducer function. This hook object is stored in the component's hook list.

When the component re-renders, React retrieves the same hook object from the list. When you call the `dispatch` function, React invokes the reducer function with the current state and the action object. The reducer returns the new state, which React then updates in the hook object. Finally, React triggers a re-render of the component with the updated state.

## useReducer vs useState

| Feature            | useState                    | useReducer                  |
| ------------------ | --------------------------- | --------------------------- |
| **Best for**       | Simple state                | Complex state logic         |
| **Update**         | Direct (`setState`)         | Via actions (`dispatch`)    |
| **Logic location** | Inline                      | Centralized in reducer      |
| **Structure**      | Single state variable       | Object with multiple fields |
| **Predictability** | Harder for multiple updates | Easier to control and debug |



### When to Use useReducer
- When you have complex state logic that involves multiple sub-values or when the next state depends on the previous state.
- When you want to centralize state management logic in a single reducer function.
- When you want to improve performance for components that trigger deep updates, as `useReducer` can help avoid unnecessary re-renders by keeping the state logic separate from the component logic.


### Summary
The `useReducer` hook is a powerful tool for managing complex state in React functional components. By using a reducer function to handle state transitions, you can keep your state logic organized and maintainable. It is especially useful when dealing with multiple related state values or when the next state depends on the previous state.
