// Class components:

// React Class Component Lifecycle — Full Sequential Flow

// React class components go through three major phases in their lifetime:
// 1. Mounting → 2. Updating → 3. Unmounting

// 1.Mounting Phase

// When a component is created and inserted into the DOM for the first time.
// Order of execution:

// constructor()
// Initializes state and binds event handlers.
// Called once before anything is rendered.
// static getDerivedStateFromProps(props, state) (rarely used)
// Syncs state with props before rendering.
// Runs right before render().
// render()
// Returns the JSX (UI structure).
// Should be pure (no side effects).

// componentDidMount()
// Runs after the component is mounted (inserted in DOM).
// Perfect for side effects (API calls, subscriptions, etc.).

// Flow summary:
// constructor → getDerivedStateFromProps → render → componentDidMount

// 2. Updating Phase
// Triggered when:
// State changes (setState()),
// Props change (from parent),
// or a force re-render occurs.

// Order of execution:
// static getDerivedStateFromProps(props, state)
// Can update state based on new props.


// shouldComponentUpdate(nextProps, nextState)
// Decides whether React should re-render or skip update (optimization).

// render()
// Called again to produce new virtual DOM.

// getSnapshotBeforeUpdate(prevProps, prevState) (optional)
// Captures information (e.g., scroll position) before DOM updates.

// componentDidUpdate(prevProps, prevState, snapshot)
// Runs after re-render and DOM update.
// Ideal for side effects after data/state changes.

// Flow summary:

// getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate

// 3️.Unmounting Phase
// When a component is removed from the DOM.
// Method:

// componentWillUnmount()
// Used for cleanup (cancel timers, remove event listeners, etc.).
// Runs just before component is destroyed.

// Flow summary:

// componentWillUnmount
// 4️.Bonus: Error Handling Phase
// Used when an error occurs during rendering or lifecycle.

// Methods:
// static getDerivedStateFromError(error)
// componentDidCatch(error, info)

// Used for fallback UI and error logging.


// Creating React Component
// - Class Component
// Using a JavaScript class, we can make a class-based React component.

import React, { Component } from 'react';

class ClassComponent extends Component{
    constructor(){
        super();
        this.state = {
            counter : 0
        }
    }
    componentDidMount = () => {
        console.log("Class Component Mounted")
    }
    componentDidUpdate = () => {
        console.log("Class Component Updated")
    }
    componentDidUnmount = () => {
        console.log("Class Component Unmounted")
    }
    increment = () => {
        this.setState(prevState => ({ counter : prevState.counter + 1 }));
    }
    
    render(){

        const headerStyles = {
            backgroundColor: '#61dafb',
            padding: '20px',
            textAlign: 'center'
        }
        return (
            <header style={headerStyles}>
              <div className='header-wrapper'>
                <h1>Hello from Class Component</h1>
              </div>
              <div style={{ color: '#08323eff', fontSize: '24px', backgroundColor: '#547dd0ff' }}>Counter: {this.counter}</div>
              <button onClick={this.increment}>increment</button>
            </header>
        )
    }
}