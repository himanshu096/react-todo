import React from 'react';
import TodosRemaining from "./TodosRemaining";
import {observer,inject} from "mobx-react";

const TodoCheckAll =  inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;

    return (
        <div className="extra-container">
            <div>
                <label>
                    <input type="checkbox" checked={!TodoStore.anyRemaining} onClick={(event) => TodoStore.checkAllTodo()}/>
                    Check All
                </label>
            </div>
            <TodosRemaining remaining = {TodoStore.remaining}/>
        </div>
    );
}));

export default TodoCheckAll;
