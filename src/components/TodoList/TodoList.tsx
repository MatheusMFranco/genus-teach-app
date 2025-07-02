import React, { useState } from 'react';

const TodoList = () => {

    const [list, setList] = useState<string[]>([]);
    const [name, setName] = useState('');

    const add = () => {
        const nameValue = name?.trim();
        if (nameValue) {
            setList([...list, nameValue]);
            setName('');
        }
    };

    const remove = (id: number) => {
        setList(list.filter((_, index: number) => index !== id));
    };

    return (
    <section>
        <h1>To Do List!</h1>
        <input value={name} type="text"data-testid="name-input" onChange={event => setName(event.target.value)} />
        <button type="button" data-testid="add-button" onClick={add}>
            Add
        </button>
        { !list.length && <strong>The list is empty!</strong> }
        <ol>
            { 
                list.map((item: string, index: number) => <li key={index}>
                    { item }
                    <button type="button" data-testid={`remove-button-${index}`} onClick={() => remove(index)}>Remove</button>
                </li>)
            }   
        </ol>
    </section>
    );
}

export default TodoList;