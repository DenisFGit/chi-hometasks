import React, { useState } from "react";
import './Counter.scss';

const Counter = (props) => {

    const [counter, setCounter] = useState(props.value);

    const increment = () => {
        setCounter(prev => prev + 1);
    }

    const decrement = () => {
        setCounter(prev => prev - 1);
    }

    return (
        <div className="counter">
            <h3>Counter: {counter}</h3>
            <div className="counter__btns">
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
            </div>
        </div>
    )
}

export default Counter;