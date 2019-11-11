import React from 'react';
import TodosRemaining from "./TodosRemaining";

const TodoCheckAll = props => {
    return (
        <div className="extra-container">
            <div>
                <label>
                    <input type="checkbox" checked={!props.anyRemaining()} onClick={(event) => props.checkAllTodo()}/>
                    Check All
                </label>
            </div>
            <TodosRemaining remaining = {props.remaining()}/>
        </div>
    );
};

export default TodoCheckAll;
