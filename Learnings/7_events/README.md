## What Are Events in React?
Events are actions or occurrences that happen in the browser — such as when a user clicks a button, types in an input, or hovers over an element.
React uses its own synthetic event system (called SyntheticEvent) that wraps the browser’s native events to ensure cross-browser compatibility and performance.

## How Events Work in React
In React, events are handled using camelCase syntax, and you pass a function as the event handler rather than a string. For example, instead of using `onclick="handleClick()"`, you would use `onClick={handleClick}` in React.

```jsx
function ButtonClick() {
  function handleClick() {
    alert("Browser says hi!");
  }

  return <button onClick={handleClick}>Click Me</button>;
}
export default ButtonClick;
```
- HTML: <button onclick="handleClick()">Click</button>
- React: <button onClick={handleClick}>Click</button>

## SyntheticEvent Object
When an event is triggered in React, a SyntheticEvent object is created. This object is a cross-browser wrapper around the native event and has the same interface as the browser’s native event, including methods like `preventDefault()` and `stopPropagation()`.

```jsx 
function ButtonClick() {
  function handleClick(event) {
    event.preventDefault();
    alert("Browser says hi!");
  }

  return <button onClick={handleClick}>Click Me</button>;
}
export default ButtonClick;
```
In this example, `event.preventDefault()` is called to prevent the default action of the button click.

## Commonly Used Events in React
| Event Type                      | Example         | Description                       |
| ------------------------------- | --------------- | --------------------------------- |
| `onClick`                       | Button click    | Triggered on mouse click          |
| `onChange`                      | Input change    | Triggered when form value changes |
| `onSubmit`                      | Form submit     | Triggered on form submission      |
| `onMouseEnter` / `onMouseLeave` | Hover effects   | Mouse enters or leaves element    |
| `onKeyDown` / `onKeyUp`         | Keyboard events | Key press detection               |
| `onFocus` / `onBlur`            | Input focus     | Gaining or losing focus           |

## Passing Arguments to Event Handlers
You can pass arguments to event handlers by using an arrow function or by binding the function.
```jsx
function ButtonClick() {
  function handleClick(name) {
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={() => handleClick("Karan")}>
      Click Me
    </button>
  );
}
export default ButtonClick;
```
In this example, an arrow function is used to pass the argument "Karan" to the `handleClick` function when the button is clicked.

## Event Pooling
React implements event pooling for performance reasons. This means that the SyntheticEvent object is reused across multiple events. If you need to access the event properties asynchronously, you should call `event.persist()` to remove the event from the pool.

```jsx
function ButtonClick() {
  function handleClick(event) {
    event.persist(); // Prevents event pooling
    setTimeout(() => {
      alert(`Event type: ${event.type}`);
    }, 1000);
  }

  return <button onClick={handleClick}>Click Me</button>;
}
export default ButtonClick;
```
In this example, `event.persist()` is called to ensure that the event properties are accessible inside the `setTimeout` callback.

## Event Bubbling and Capturing
React follows the standard DOM event propagation model, which includes both bubbling and capturing phases. By default, React uses event bubbling, where the event propagates from the target element up to the root.
You can use the `capture` modifier to listen for events during the capturing phase.
- Bubbling phase: inner → outer elements
- Capturing phase: outer → inner elements
```jsx
<div onClickCapture={() => console.log("Outer")}>
  <button onClick={() => console.log("Inner")}>Click</button>
</div>
```
In this example, clicking the button will log "Outer" first (capturing phase) followed by "Inner" (bubbling phase).

## Prevent Default and Stop Propagation
You can use `event.preventDefault()` to prevent the default action associated with an event, and `event.stopPropagation()` to stop the event from propagating further up the DOM tree.

```jsx
function ButtonClick() {
  function handleClick(event) {
    event.preventDefault(); // Prevents default action
    event.stopPropagation(); // Stops event propagation
    alert("Button clicked!");
  }

  return (
    <a href="https://example.com" onClick={handleClick}>
      Click Me
    </a>
  );
}
export default ButtonClick;
```
In this example, clicking the link will not navigate to "https://example.com" due to `event.preventDefault()`, and the event will not propagate further due to `event.stopPropagation()`.


## Summary
- React uses a synthetic event system for cross-browser compatibility.
- Events are handled using camelCase syntax and functions as handlers.
- The SyntheticEvent object provides methods like `preventDefault()` and `stopPropagation()`.
- You can pass arguments to event handlers using arrow functions or binding.
- React implements event pooling for performance; use `event.persist()` to access event properties asynchronously.
- React follows the standard DOM event propagation model with bubbling and capturing phases.

## Further Reading
- [React Official Documentation on Events](https://reactjs.org/docs/events.html)