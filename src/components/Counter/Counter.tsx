import React, { useState } from 'react';

const Counter = () => {

    const [numberValue, setNumberValue] = useState(0);

    const increment = () => {
        setNumberValue(numberValue + 1);
    };

    const decrement = () => {
        setNumberValue(numberValue - 1);
    }

    return (<section>
        { !!numberValue && <button type="button" data-testid="decrement-button" onClick={decrement}>-</button> }
        <strong data-testid="number-value">
            { numberValue }
        </strong>
        <button type="button" data-testid="increment-button" onClick={increment}>+</button>
    </section>)
};

export default Counter;