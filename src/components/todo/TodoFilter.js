import React from 'react';
import * as classnames from "classnames";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {observer,inject} from "mobx-react";


const TodoFilter =  inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;
    return (
            <div className="extra-container">
                <div>
                    <button onClick={() => TodoStore.updateFilter('all')}
                            className={classnames({'active': TodoStore.filter === "all"})}>All
                    </button>
                    <button onClick={() => TodoStore.updateFilter('active')}
                            className={classnames({'active': TodoStore.filter === "active"})}>Active
                    </button>
                    <button onClick={() => TodoStore.updateFilter('completed')}
                            className={classnames({'active': TodoStore.filter === "completed"})}>Completed
                    </button>
                </div>

                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300}
                                         transitionLeaveTimeout={300}>
                    <div>
                        {TodoStore.todos.length - TodoStore.remaining > 0 &&
                        <button onClick={TodoStore.clearCompleted}>Clear completed</button>}
                    </div>
                </ReactCSSTransitionGroup>.
        </div>
    );
}));

export default TodoFilter;
