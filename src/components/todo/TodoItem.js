import React from 'react';
import {observer,inject} from "mobx-react";

const TodoItem = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;
    return (
        <div key={props.todo.id} className="todo-item">
            <div className="todo-item-left">
                <input type="checkbox" onClick={(event) => TodoStore.checkTodo(props.todo, props.index)}
                       checked={props.todo.completed}/>

                {!props.todo.editing &&
                <div className={"todo-item-label " + (props.todo.completed ? "completed" : "")}
                     onDoubleClick={(event) => TodoStore.editTodo(props.todo, props.index)}>
                    {props.todo.title}
                </div>
                }
                {props.todo.editing &&
                <input className="todo-item-edit" type="text" autoFocus defaultValue={props.todo.title}
                       onBlur={(event) => TodoStore.updateTodo(props.todo, props.index, event)}
                       onKeyUp={(event) => {
                           if (event.key === "Enter") {
                               TodoStore.updateTodo(props.todo, props.index, event);
                           }
                       }}/>}

            </div>
            <div className="remove-item" onClick={(event) => TodoStore.removeToDo(props.todo.id)}>&times;</div>
        </div>
    );
}));

export default TodoItem;
