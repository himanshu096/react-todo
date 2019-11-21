import * as React from "react/cjs/react.development";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import TodoCheckAll from "./TodoCheckAll";
import {observer,inject} from "mobx-react";

@inject('TodoStore') @observer
class Todo extends React.Component {
    render() {
        const TodoStore = this.props.TodoStore;
        return (
            <div className="Todo-container">
                <input type="text" className="todo-input" placeholder="What you want to do!!" ref={TodoStore.todoInput}
                       onKeyUp={TodoStore.addTodo}/>

                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300}
                                         transitionLeaveTimeout={300}>
                    {TodoStore.filteredTodos.map((todo, index) =>
                      <TodoItem key={todo.id} todo={todo} index={index} />
                    )}
                </ReactCSSTransitionGroup>

                <TodoCheckAll  TodoStore={TodoStore}  />

                <TodoFilter todos={TodoStore.todos}  clearCompleted={this.clearCompleted}/>
            </div>
        );
    }

    todoInput = React.createRef();

    clearCompleted = () => {
        this.setState((prevState, props) => {
            return {todos: prevState.todos.filter(todo => !todo.completed)}
        });
    };

}

export default Todo;