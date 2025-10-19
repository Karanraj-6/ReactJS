# Higher Order Functions(HOD) in React

The term higher order component is similar to higher order function in JavaScript. In JavaScript, a higher order function is a function that takes another function as a parameter or return another function.
Similar to higher order function, a higher order component takes a component and return another component. 
 - adding extra functionality or logic without modifying the original component.
This definition will make sense with examples. Look at the example below for better understand.

```jsx
import React from 'react';
function withLogger(WrappedSimpleComponent) {
  return function LoggerComponent(props) {
    return (
      <div>
        <p>Rendering component with props: {JSON.stringify(props)}</p>
        <WrappedSimpleComponent {...props} />
      </div>
    );
  };
}
function SimpleComponent({ message }) {
  return <div>{message}</div>;
}
const EnhancedComponent = withLogger(SimpleComponent);

export default function App() {
  return <EnhancedComponent message="Hello, World!" />;
}
```
output:
```html
<div>
  <p>Rendering component with props: {"message":"Hello, World!"}</p>
  <div>Hello, World!</div>
</div>
```
In this example, `withLogger` is a higher order component that takes `SimpleComponent` as an argument and returns a new component `LoggerComponent`. The `LoggerComponent` logs the props to the console before rendering the original `SimpleComponent`. This way, we have added logging functionality without modifying the original component.

Higher order components are useful for reusing component logic, such as authentication, theming, data fetching, etc. They help in keeping the code DRY (Don't Repeat Yourself) and maintainable.

## Common Use Cases of HOCs
1. **Code Reusability**: Share common functionality across multiple components.
2. **Conditional Rendering**: Render components based on certain conditions.
3. **State Management**: Manage state logic that can be shared across components.
4. **Enhancing Props**: Modify or add props to the wrapped component.
Authentication checks
Permission guards
Data fetching wrappers
Error boundaries
Theming or layout wrappers

### example: Authentication HOC
```jsx
function withAuth(WrappedComponent) {
  return function Authenticated(props) {
    const isLoggedIn = true; // just example

    if (!isLoggedIn) {
      return <h3>Please login to continue</h3>;
    }

    return <WrappedComponent {...props} />;
  };
}

// Wrapped component
function Dashboard() {
  return <h1>Welcome to Julie’s Dashboard!</h1>;
}

const ProtectedDashboard = withAuth(Dashboard);

export default function App() {
  return <ProtectedDashboard />;
}
```
In this example, `withAuth` is a higher order component that checks if the user is logged in before rendering the `Dashboard` component. If the user is not logged in, it displays a message instead. This way, we can protect multiple components by wrapping them with the `withAuth` HOC.


## Passing Props Through HOCs
When using higher order components, it's important to pass props correctly to the wrapped component. You can do this by spreading the props received by the HOC to the wrapped component.
```jsx
<Component {...props} />
```
This ensures no data is lost and makes the wrapper transparent to the inner component.

## HOCs vs Render Props vs Hooks
| Feature        | HOC                        | Render Props              | Hooks                                |
| -------------- | -------------------------- | ------------------------- | ------------------------------------ |
| **Pattern**    | Function wraps a component | Function prop returns JSX | Function extracts logic              |
| **Use case**   | Reuse behavior             | Reuse logic per render    | Reuse logic in functional components |
| **Modern use** | Legacy but useful          | Moderate                  | Preferred                            |

Today, React Hooks often replace HOCs for cleaner logic reuse (e.g., useAuth, useData, etc.), but HOCs are still used in many libraries like React Router, Redux, and Relay.

## Real-World Examples
- React Redux:
    connect(mapStateToProps, mapDispatchToProps)(MyComponent)
- React Router (v5):
    withRouter(MyComponent)
- Material-UI:
    withStyles(styles)(Component)
These are all HOCs that add extra behavior or data without modifying the base component.

## Naming Convention
By convention, the new component is given a descriptive name like:
```jsx
withAuth(Dashboard) → ProtectedDashboard
withTheme(Button) → ThemedButton
```
This helps in identifying the enhanced component easily.

## Best Practices
- Don’t mutate the original component.
- Keep HOCs focused on a single responsibility.
- Always copy props ({...props}) to maintain flexibility.
- Use display names for debugging:
```Wrapped.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;```

## Common Pitfalls
- Nested HOCs can create confusing component trees.
- Prop conflicts if wrapper props overlap inner component props.
- Hooks often simplify logic that older code handled with HOCs.

## summary
Higher order components are a powerful pattern in React for reusing component logic and enhancing functionality without modifying.
| Concept                | Explanation                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| **Definition**         | Function that takes a component and returns an enhanced component |
| **Purpose**            | Reuse logic between multiple components                           |
| **Used For**           | Auth, data fetching, theming, logging, etc.                       |
| **Modern Alternative** | Hooks (like `useAuth`, `useTheme`, etc.)                          |
| **Key Rule**           | Never modify the original component — only wrap it                |


