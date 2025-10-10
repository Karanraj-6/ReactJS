// JSX stands for JavaScript XML. JSX allows us to write HTML elements with JavaScript code. 
// An HTML element has an opening and closing tags, content, and attribute in the opening tag. 
// However, some HTML elements may not have content and a closing tag - they are self closing elements. 
// To create HTML elements in React we do not use the _createElement()_ instead we just use JSX elements. 
// Therefore, JSX makes it easier to write and add HTML elements in React.
//  JSX will be converted to JavaScript on browser using a transpiler - [babel.js](https://babeljs.io/). 
// Babel is a library which transpiles JSX to pure JavaScript and latest JavaScript to older version. See the JSX code below.

const title = <title>My Title</title>       // JSX element (wrapping HTML in JS)
const header = <h1 className="header">Hello World</h1>  // JSX element with attribute
const paragraph = <p>This is my first React App</p>      // JSX element
const image = <img src="image.jpg" alt="My Image" />     // self closing JSX element
const list = (                                            // JSX element with nested elements
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
);
const link = <a href="https://example.com">Click Here</a> // JSX element with attribute

// The above JSX code will be transpiled to the following JavaScript code by Babel.

const title1 = React.createElement("title", null, "My Title");
const header1 = React.createElement("h1", { className: "header" }, "Hello World");
const paragraph1 = React.createElement("p", null, "This is my first React App");
const image1 = React.createElement("img", { src: "image.jpg", alt: "My Image" });
const list1 = React.createElement("ul", null, 
  React.createElement("li", null, "Item 1"),
  React.createElement("li", null, "Item 2"),
  React.createElement("li", null, "Item 3")
);
const link1 = React.createElement("a", { href: "https://example.com" }, "Click Here");

// As you can see the JSX code is much easier to write and understand than the JavaScript code.
// JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods.
// JSX is not a string or HTML. It is a syntax extension of JavaScript.