import React from 'react'
import { useForm } from '../hooks/useForm';

export const TodoAdd = ({handleAddTodo}) => {
    
    const [{description}, handleInputChange, reset] = useForm({
        description:''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(description.trim().length <= 1) return;
        
        const newTodo = {
            id: new Date().getTime(),
            desc: description,
            done: false
        }

        const action = {
            type: 'add',
            payload: newTodo
        }
        handleAddTodo(newTodo);
        reset();
    }
    
    return (
        <>
            <h3>Agregar ToDo</h3>
            <hr />
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="description"
                    placeholder="Aprender..."
                    autoComplete="off"
                    className="form-control"
                    value={description}
                    onChange={handleInputChange}
                />

                <button
                    type="submit" 
                    className="btn btn-block btn-outline-primary btn-block mt-2">
                    Agregar
                </button>
            </form>   
        </>
    )
}
