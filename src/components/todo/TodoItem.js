import React from 'react';

const TodoItem = (props) => {
    return (
        <div key={props.todo.id} className="todo-item">
            <div className="todo-item-left">
                <input type="checkbox" onClick={(event) => props.checkTodo(props.todo, props.index)}
                       checked={props.todo.completed}/>

                {!props.todo.editing &&
                <div className={"todo-item-label " + (props.todo.completed ? "completed" : "")}
                     onDoubleClick={(event) => props.editTodo(props.todo, props.index)}>
                    {props.todo.title}
                </div>
                }
                {props.todo.editing &&
                <input className="todo-item-edit" type="text" autoFocus defaultValue={props.todo.title}
                       onBlur={(event) => props.updateTodo(props.todo, props.index, event)}
                       onKeyUp={(event) => {
                           if (event.key === "Enter") {
                               props.updateTodo(props.todo, props.index, event);
                           }
                       }}/>}

            </div>
            <div className="remove-item" onClick={(event) => props.removeToDo(props.todo.id)}>&times;</div>
        </div>
    );
};

export default TodoItem;
