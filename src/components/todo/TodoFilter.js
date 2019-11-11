import React from 'react';
import * as classnames from "classnames";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const TodoFilter = (props) => {
    return (
            <div className="extra-container">
                <div>
                    <button onClick={() => props.updateFilter('all')}
                            className={classnames({'active': props.filter === "all"})}>All
                    </button>
                    <button onClick={() => props.updateFilter('active')}
                            className={classnames({'active': props.filter === "active"})}>Active
                    </button>
                    <button onClick={() => props.updateFilter('completed')}
                            className={classnames({'active': props.filter === "completed"})}>Completed
                    </button>
                </div>

                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300}
                                         transitionLeaveTimeout={300}>
                    <div>
                        {props.todos.length - props.remaining() > 0 &&
                        <button onClick={props.clearCompleted}>Clear completed</button>}
                    </div>
                </ReactCSSTransitionGroup>.
        </div>
    );
};

export default TodoFilter;
