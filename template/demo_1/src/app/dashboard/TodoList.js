import React, { useState } from 'react';

const TodoList = (props) => {
    const [todos, setTodos] = useState(props.todos)

    const [inputValue, setInputValue] = useState('')

    function statusChangedHandler(event, id) {
        const todo = { ...todos[id] };
        todo.isCompleted = event.target.checked;

        const _todos = [...todos];
        _todos[id] = todo;

        setTodos(_todos)
    }

    function addTodo(event) {
        event.preventDefault();

        const _todos = [...todos];
        _todos.unshift({
            id: _todos.length ? _todos[_todos.length - 1].id + 1 : 1,
            task: inputValue,
            isCompleted: false
        })

        setTodos(_todos)
        setInputValue('')
    }

    function removeTodo(index) {
        const _todos = [...todos];
        _todos.splice(index, 1);

        setTodos(_todos)
    }

    function inputChangeHandler(event) {
        setInputValue(event.target.value);
    }

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Todo</h4>
                <form className="add-items d-lg-flex" onSubmit={(e) => addTodo(e)}>
                    <input
                        type="text"
                        className="form-control h-auto"
                        placeholder="What do you need to do today?"
                        value={inputValue}
                        onChange={(e) => inputChangeHandler(e)}
                        required />
                    <button type="submit" className="btn btn-primary font-weight-bold ml-0 mt-2 mt-lg-0">Add</button>
                </form>
                <div className="list-wrapper">
                    <ul className="d-flex flex-column todo-list todo-padding-lg">
                        {todos.map((todo, index) => {
                            return <ListItem
                                isCompleted={todo.isCompleted}
                                changed={(event) => statusChangedHandler(event, index)}
                                key={todo.id}
                                remove={() => removeTodo(index)}
                            >{todo.task}</ListItem>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

const ListItem = (props) => {
    return (
        <li className={(props.isCompleted ? 'completed' : null)}>
            <div className="form-check form-check-success m-0 align-items-start">
                <label htmlFor="" className="form-check-label font-weight-medium">
                    <input className="checkbox" type="checkbox"
                        checked={props.isCompleted}
                        onChange={props.changed}
                    /> {props.children} <i className="input-helper"></i>
                </label>
            </div>
            <i className="remove mdi mdi-close-circle-outline" onClick={props.remove}></i>
        </li>
    )
};

export default TodoList;

