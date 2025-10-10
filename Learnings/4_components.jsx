// Components:
// A React component is a small, reusable code, which is responsible for one part of the application UI. 
// A React application is an aggregation of components. React can help us to build reusable components. 
// The following diagram shows different components. All the components have different border colors. 
// In React we assemble different components together to create an application. We use JavaScript functions or classes to make components. 
// If we use a function, the component will be a functional component, but if we use a class, the component will be a class-based component.

// Components can be:

// Functional Component / Presentational Component / Stateless Component / Dumb Component
// Class Component / Container Component/ Statefull Component / Smart Component
// The classification of components above does not work for the latest version of React, but it is good to know the former definition and how the previous versions work.

// Components in React are JavaScript functions or classes, that return a JSX. 
// Component name must start with an uppercase, and if the name is two words, it should be CamelCase - a camel with two humps.


// Creating React Component
// - Functional Component
// Using a JavaScript function, we can make a functional React component.

// React component syntax
// it can be arrow function, function declaration or function expression

// const jsx = <tag> Content </tag>
// const ComponentName = () => {
//   return jsx
// }

// JSX element, header
const header = (
  <header style={headerStyles}>
    <div className='header-wrapper'>
      <h1>Hello</h1>
    </div>
  </header>
)

// React Component
const HeaderOne = () => {
  return header
}

// or we can just return the JSX

const HeaderTwo = () => {
  return (
    <header style={headerStyles}>
      <div className='header-wrapper'>
        <h1>Hello</h1>
      </div>
    </header>
  )
}

// Even th above code can be written like this

// Explicitly returning the JSX
const HeaderThree = () => (
   <> 
    <header style={headerStyles}>
        <h1>Hello</h1>
    </header>
   </>
)