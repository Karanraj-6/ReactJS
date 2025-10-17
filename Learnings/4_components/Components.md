## Components:
- A React component is a small, reusable code, which is responsible for one part of the application UI. 
- A React application is an aggregation of components. React can help us to build reusable components. 
- The following diagram shows different components. All the components have different border colors. 
- In React we assemble different components together to create an application. We use JavaScript functions or classes to make components. 
- If we use a function, the component will be a functional component, but if we use a class, the component will be a class-based component.

## Components can be:

- i. Functional Component / Presentational Component / Stateless Component / Dumb Component
- ii. Class Component / Container Component/ Statefull Component / Smart Component
 The classification of components above does not work for the latest version of React, but it is good to know the former definition and how the previous versions work.
Components in React are JavaScript functions or classes, that return a JSX. 
Component name must start with an uppercase, and if the name is two words, it should be CamelCase - a camel with two humps.

### The History of Components:
- In the earlier versions of React, there were two types of components: Functional Components and Class Components.
- Functional components were stateless, and class components were stateful.
- With the introduction of React Hooks in version 16.8, functional components can now manage
state and side effects, making them capable of handling tasks that were previously exclusive to class components.
- As a result, functional components have become the preferred choice for building React applications due to their simplicity and ease of use.

## detailed Explaination of state of components:
### What is State?
- State is a built-in React object that is used to contain data or information about the component.
- A component's state can change over time; whenever it changes, the component re-renders.
- State is mutable, unlike props, which are immutable.      
### How the state works with components?
- The state is an object that holds the data that may change over the lifecycle of the component.
- When the state of a component changes, React re-renders the component to reflect the new state.
- Each component can have its own state, which is managed within the component itself.


# State

### State definition:
    In React, state is a JavaScript object that stores dynamic data that affects a component’s rendering.
    When state changes, React automatically re-renders the component to reflect those changes in the UI.


## COMPLETE INTERNAL FLOW OF CLASS COMPONENT STATE IN REACT
    Let’s start with a normal class component:
```class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0, name: "Karan" };
  }

  increment = () => {
    this.setState(prev => ({ counter: prev.counter + 1 }));
  };

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <p>Counter: {this.state.counter}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```
Here, this.state is an object, and React adds special internal properties to manage it.

* How the this.state Object Looks Internally 

    When React creates your component instance, it attaches several internal properties:

```this = {
  props: {},                  // Props passed from parent
  state: { counter: 0, name: "Karan" }, // User-defined state
  updater: {                  // React's internal updater object
    enqueueSetState: f,       // Function that queues state updates
    enqueueReplaceState: f,   // Function that replaces state entirely
    enqueueForceUpdate: f
  },
  _reactInternals: { ... },   // Link to React Fiber Node (internal tree)
  render: f,                  // Render method defined by user
  setState: f,                // Bound version of enqueueSetState
  forceUpdate: f,             // Forces re-render (rarely used)
};
```
(OR)

React calls new ClassComponent(props).
Inside the constructor:

```this.state = { counter: 0, name: "Karan" };```
React attaches internal properties to the instance:
So your component instance (this) in memory looks like:

```this = {
  props: { ... },
  state: { counter: 0, name: "Karan" },
  updater: { enqueueSetState: f, enqueueForceUpdate: f, ... },
  _reactInternals: { ...Fiber node... },
  render: f,
  increment: f,
  componentDidMount: f,
  componentDidUpdate: f,
  refs: {},
  context: undefined,
  isReactComponent: {}
};
```

## Understanding this.state
At the component level:
```this.state = { counter: 0, name: "Karan" };```

It looks like a plain object — and it is, from your perspective.
But React also stores a mirrored copy in its Fiber system, where it becomes:

```fiber.memoizedState = { counter: 0, name: "Karan" };
fiber.updateQueue.baseState = { counter: 0, name: "Karan" };
```


That means:
this.state = live view of component’s state
fiber.memoizedState = React’s internal snapshot of committed state

## 4. The React Fiber Node
Every React component has an internal Fiber node that represents it in React’s virtual DOM tree.
Roughly:

```fiber = {
  tag: 1,                     // ClassComponent
  type: ClassComponent,       // Component function/class reference
  key: null,
  stateNode: this,            // The component instance
  return: parentFiber,        // Parent Fiber in the tree
  child: null,
  sibling: null,
  memoizedProps: { ... },     // Last props used for rendering
  memoizedState: { counter: 0, name: "Karan" }, // Last committed state
  updateQueue: {
    baseState: { counter: 0, name: "Karan" },
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null },  // Pending updates
    effects: null
  },
  lanes: 0,
  childLanes: 0
};
```


And this Fiber node is linked back to your component via:

```this._reactInternals = fiber;```

That’s how React knows which Fiber node belongs to which class instance.

## 5. The Updater

Your instance also gets an internal property:

```this.updater = {
  enqueueSetState: function(inst, payload, callback, callerName) { ... },
  enqueueForceUpdate: function() { ... },
  enqueueReplaceState: function() { ... }
};
```

This object is React’s internal bridge between your setState() call and the Fiber scheduler.

## 6. When You Call this.setState()

Let’s say you call:
this.setState({ counter: this.state.counter + 1 });

Here’s what happens step by step:

- this.setState() calls:

```this.updater.enqueueSetState(this, { counter: 1 }, null, "setState");```

- Inside enqueueSetState, React does:

```const fiber = inst._reactInternals;
const update = {
  lane: laneNumber,
  action: { counter: 1 },   // or function for functional updates
  eagerState: null,
  eagerReducer: null,
  next: null
};
```

- It adds that update to the update queue of the fiber:

```fiber.updateQueue.shared.pending = update;```

Finally, it triggers:

```scheduleUpdateOnFiber(fiber);```

which tells React to start a re-render on that component.

## Render Phase (Processing the Update Queue)

When React re-renders, it begins the render phase for that Fiber:

```newState = processUpdateQueue(fiber.updateQueue, prevState, props);```

Inside processUpdateQueue, React performs:

```let baseState = { counter: 0, name: "Karan" };

let newState = baseState;
let update = queue.shared.pending; // The one we added

while (update !== null) {
  const action = update.action; // { counter: 1 }
  newState = { ...newState, ...action };
  update = update.next;
}

// newState = { counter: 1, name: "Karan" }
```

Then React updates:
```fiber.memoizedState = newState;
fiber.updateQueue.baseState = newState;
```

This means the internal Fiber state and this.state are now synced.

## Reconciliation Phase

Next, React calls your render() method again with the updated state:

```render() → <div>Counter: 1</div>```

React compares this new virtual DOM with the old one:
```<div>Counter: 0</div>
<div>Counter: 1</div>
```

It detects that the text node inside <p> changed from “0” to “1”.
React marks that text node for update.

## Commit Phase

In the commit phase, React:
Updates the real DOM (text node now shows 1)

Runs ```componentDidUpdate()``

Flushes effects (useEffect equivalents in class: componentDidMount, etc.)

Now:
```this.state = { counter: 1, name: "Karan" }
fiber.memoizedState = { counter: 1, name: "Karan" }
fiber.updateQueue.baseState = { counter: 1, name: "Karan" }
```

## Subsequent Updates (Continuous Flow)

If you call setState() again:
New update object created → added to fiber.updateQueue.shared.pending
React schedules a re-render (may batch multiple updates)
During render phase → processes all pending updates in the queue:

newState = ```applyAllUpdates(baseState, updates);```


Updates Fiber + UI again.

## The this Object Internally (After Mount)

Here’s a realistic representation of your class instance in memory:

```this = {
  props: { ... },
  state: { counter: 1, name: "Karan" },
  updater: {
    enqueueSetState: f,
    enqueueForceUpdate: f,
    enqueueReplaceState: f
  },
  _reactInternals: {
    tag: 1,
    type: ClassComponent,
    key: null,
    stateNode: [Circular: this],
    memoizedState: { counter: 1, name: "Karan" },
    updateQueue: {
      baseState: { counter: 1, name: "Karan" },
      shared: { pending: null },
      firstBaseUpdate: null,
      lastBaseUpdate: null
    },
    lanes: 0
  },
  render: f,
  increment: f,
  componentDidMount: f,
  componentDidUpdate: f,
  refs: {},
  context: undefined,
  isReactComponent: {}
};
```

## Simplified End-to-End Flow Diagram
this.setState()
   ↓
this.updater.enqueueSetState()
   ↓
Create update object
   ↓
Push into fiber.updateQueue.shared.pending
   ↓
scheduleUpdateOnFiber(fiber)
   ↓
React render phase → processUpdateQueue()
   ↓
Compute new fiber.memoizedState
   ↓
Call render() again
   ↓
Diff new vs old virtual DOM
   ↓
Commit Phase → update real DOM
   ↓
componentDidUpdate() triggered

## 13. Summary Table

Stage	              What Happens	                             Key Objects
Constructor	        Initialize this.state	                     this.state, fiber.memoizedState
Mount	            Fiber created, linked via _reactInternals	 fiber, updateQueue
setState()	        Creates update, enqueues it	                 this.updater, updateQueue.shared.pending
Render Phase	    Processes updates to get new state	         processUpdateQueue()
Reconciliation	    Diffs old & new virtual DOM	                 Virtual DOM tree
Commit Phase	    Updates DOM & lifecycle methods	             Real DOM


this.state is your public state object.
Internally, React mirrors it in:
fiber.memoizedState
fiber.updateQueue.baseState
this.updater.enqueueSetState() creates and enqueues updates.
React processes them during the render phase, updates the Fiber tree, then commits DOM changes.
_reactInternals links your component instance to its Fiber representation.

### Extra resource for visual daigram [blog]:
https://www.edureka.co/blog/react-components/



