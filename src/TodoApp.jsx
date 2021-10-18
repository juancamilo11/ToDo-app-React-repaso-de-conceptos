import React, { useEffect, useReducer } from 'react'
import { TodoList } from './components/TodoList';
import { useForm } from './hooks/useForm';
import { todoReducer } from './reducer/todoReducer';

const init = () => {   
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const TodoApp = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init);

    const [{description}, handleInputChange, reset] = useForm({
        description:''
    });


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

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
        dispatch(action);
        reset();
    }

    const handleDelete = (todoId) => {
        const action = {
            type:'delete',
            payload:todoId
        }

        dispatch(action);
    }

    const handleToggle = (todoId) => {
        
        const action = {
            type:'toggle',
            payload:todoId
        }

        dispatch(action);
    }

    return (
        <div>
            <h1>TodoApp ({ todos.length })</h1>
            <hr />

            <div className="row">
                <div className="col-7">
                    <TodoList
                        todos={todos}
                        handleDelete={handleDelete}
                        handleToggle={handleToggle}
                    />
                </div>
                <div className="col-5">
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
                </div>
            </div>
        </div>
    )   
}
