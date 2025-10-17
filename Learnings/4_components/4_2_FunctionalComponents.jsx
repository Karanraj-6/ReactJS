   
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