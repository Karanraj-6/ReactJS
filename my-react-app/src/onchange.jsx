//onchange() : // The onChange event handler in React is used to handle changes to form elements like input, textarea, and select.
// It is triggered when the value of the element changes, allowing you to update the component's state or perform other actions based on user input.

import React, { useState } from 'react';
// This component demonstrates how to use the onChange event handler in React

function MyComponent(){
    const [name, setName] = useState("")
    const changeHandler = (event) => {
        setName(event.target.value);
    }
    return(
        <div>
        <input value={name} onChange={changeHandler}></input>
        <p>Entered Text : {name}</p>
        </div>        
    )

}

export default MyComponent;