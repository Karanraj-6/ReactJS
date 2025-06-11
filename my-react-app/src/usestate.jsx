// REact hooks : React hook Special function that allows functional components 
// to use React features without writing class components (React v16.8+).
// React hooks are functions that let you use state and other React features in functional components.
// (useState, useEffect, useContext, useReducer, useCallback, and more 

// useState() A React hook that allows the creation of a stateful variable AND a setter function to update its value in the Virtual DOM. 
// in functional components. It returns an array with the current state and a function to update it.
// useState syntax: useState [name, setName] = useState(initialValue)


import React, { useState } from 'react';

function UseStateExample() {
    // Declare a state variable 'count' with an initial value of 0
    const [count, setCount] = useState(0);

    const [car , setCar] = useState({model : "BMW", modelYear : 2023 , color : "Black"});

    // function to update the car model
    const updateCarModel = (e) => {
    const value = e.target.value;
    setCar(prevCar => ({ ...prevCar, model: value }));
    };

    const updateCarModelYear = (e) => {
    const value = Number(e.target.value);
    setCar(prevCar => ({ ...prevCar, modelYear: value }));
    };

    const updateCarColor = (e) => {
    const value = e.target.value;
    setCar(prevCar => ({ ...prevCar, color: value }));
    };

    // Function to increment the count
    const increment = () => {
        setCount(count + 1);
    };

    // Function to decrement the count
    const decrement = () => {
        setCount(count - 1);
    };

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <br />
            <input type="text" value={car.model} onChange={updateCarModel} />
            <input type="number" value={car.modelYear} onChange={updateCarModelYear} />
            <input type="text" value={car.color} onChange={updateCarColor} />
        </div>
    );
}

export default UseStateExample;
