# What are props?
Props (short for properties) are inputs to React components.(They are just like **kwargs** in functions in Python or parameters in other programming languages).
They are used to pass data from a parent component to a child component.
They make components reusable and dynamic by customizing their behavior or content.
- They are read-only and allow you to customize the behavior and appearance of components.

```function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
<Welcome name="Karan" />
```
In this example, the `Welcome` component receives a prop called `name` and uses it to display a personalized greeting.

### Why Props are Needed?
Without props, all components would display the same content.
Props allow dynamic rendering — the same component can behave differently based on input data.

| HTML Attribute | React Prop               |
| -------------- | ------------------------ |
| Static         | Dynamic                  |
| String only    | Any JS expression        |
| Used in HTML   | Used in React components |

```<img src="logo.png" alt="logo" />   // HTML attribute
<Greet name="Karan" />              // React prop
```

* Props as Data Inputs: Props act like function parameters — data flows from parent → child.
They make the UI reactive to data changes.

## Passing Props

```<Greet name="Karan" age={21} />```

* Props can be any data type — string, number, array, object, or even a function.
Example:

```function Greet({ name, age }) {
  return <p>{name} is {age} years old.</p>;
}```

* Default Props
If a prop isn’t passed, React allows you to define default values.
```Greet.defaultProps = {
  age: 18
};```

* Props with JSX Expressions
You can pass dynamic values:
```<Greet name={user.name} age={user.age + 1} />```

## Accessing Props
Function Components
```function Greet(props) {
  return <h1>Hello {props.name}</h1>;
}```

or via destructuring:

```function Greet({ name }) {
  return <h1>Hello {name}</h1>;
}```

Class Components
```class Greet extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}```

## 4. Props are Immutable
- Concept of Immutability
- Props cannot be modified by the receiving component.
- They are read-only — changing them would break React’s unidirectional data flow.

* Why We Don’t Modify Props
React’s design relies on predictability — if children could modify props, UI updates would become inconsistent.
Incorrect :
```props.name = "Julie";```

Correct :
```this.setState({ name: "Julie" });```

* Common Mistake
Beginners often try to use props like state. Props are just inputs, not internal data.
"Props Down, Actions Up"
- Props Down: Data flows downward from parent to child.
- Actions Up: Events or callbacks flow upward from child to parent.

## Props vs State
| Feature    | Props                   | State                                |
| ---------- | ----------------------- | ------------------------------------ |
| Ownership  | Parent component        | Component itself                     |
| Mutability | Immutable               | Mutable (can change with `setState`) |
| Usage      | Pass data               | Store component data                 |
| Lifecycle  | Read-only               | Can change during component life     |
| Example    | `<User name="Karan" />` | `this.state = { count: 0 }`          |

## Destructuring Props
Destructuring allows you to extract multiple properties from props in a cleaner way.

Function Components
```function Greet({ name, age }) {
  return <p>{name} is {age} years old.</p>;
}
```

Class Components
```class Greet extends React.Component {
  render() {
    const { name, age } = this.props;
    return <p>{name} is {age} years old.</p>;
  }
}
```

Nested Props
```function Profile({ user: { name, age } }) {
  return <p>{name} ({age})</p>;
}
```

## Default Props
Class Components
```class Greet extends React.Component {
  static defaultProps = {
    name: "Guest"
  };
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}
```

Function Components
```function Greet({ name = "Guest" }) {
  return <h1>Hello {name}</h1>;
}```

## Prop Types (Validation)

Why Validation?
To ensure props are of the expected type, reducing runtime bugs.

Setup
```npm install prop-types```

Usage
```import PropTypes from 'prop-types';

function Greet({ name, age }) {
  return <p>{name} is {age} years old.</p>;
}

Greet.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
};
```
| Type   | Example            |
| ------ | ------------------ |
| string | `PropTypes.string` |
| number | `PropTypes.number` |
| bool   | `PropTypes.bool`   |
| array  | `PropTypes.array`  |
| object | `PropTypes.object` |
| func   | `PropTypes.func`   |


## Props in Class Components

Example:
```class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}```

Passing Function as Prop
```class Button extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>Click</button>;
  }
}```

## Props in Function Components
Example:
```function Welcome({ name }) {
  return <h1>Hello {name}</h1>;
}

Event Handlers as Props
function Child({ onClick }) {
  return <button onClick={onClick}>Click Me</button>;
}

function Parent() {
  const handleClick = () => alert("Clicked!");
  return <Child onClick={handleClick} />;
}
```
##  11. Children Prop
What is props.children?
props.children is a special prop that holds the nested JSX elements inside a component.
Example:

```function Wrapper({ children }) {
  return <div className="box">{children}</div>;
}

<Wrapper>
  <p>Hello inside Wrapper!</p>
</Wrapper>
```

Output:
```<div class="box">
  <p>Hello inside Wrapper!</p>
</div>
```
Manipulating Children
```React.Children.map(props.children, child => (
  <div className="child">{child}</div>
));```

Conditional Children Rendering
```{props.children && <div>{props.children}</div>}```

## 12. Passing Functions as Props
Concept
Functions can be passed as props to enable child-to-parent communication.
Example:
```function Child({ onAlert }) {
  return <button onClick={onAlert}>Alert</button>;
}

function Parent() {
  const showAlert = () => alert("Hello from Parent!");
  return <Child onAlert={showAlert} />;
}
```

Parent passes a function
Child triggers it on button click

## 13. Spread Operator with Props
Passing All Props
```function Display({ name, age }) {
  return <p>{name} ({age})</p>;
}

const user = { name: "Karan", age: 21 };
<Display {...user} />;
```
Overriding Props
```<Display {...user} age={22} />