import * as React from "react/cjs/react.development";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import TodoCheckAll from "./TodoCheckAll";
import {inject,Observer} from "mobx-react";


@inject('TodoStore')
@Observer
class Todo extends React.Component {
    render() {
        // const TodoStore = this.props.TodoStore;
        return (
            <div className="Todo-container">
                <input type="text" className="todo-input" placeholder="What you want to do!!" ref={this.todoInput}
                       onKeyUp={this.addTodo}/>

                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300}
                                         transitionLeaveTimeout={300}>
                    {this.filteredTodos().map((todo, index) =>
                      <TodoItem key={todo.id} todo={todo} index={index} checkTodo={this.checkTodo} updateTodo={this.updateTodo} editTodo={this.editTodo} removeToDo={this.removeToDo}   />
                    )}
                </ReactCSSTransitionGroup>

                <TodoCheckAll anyRemaining={this.anyRemaining} checkAllTodo={this.checkAllTodo} remaining={this.remaining}  />

                <TodoFilter todos={this.state.todos} filter={this.state.filter} updateFilter={this.updateFilter} remaining={this.remaining} clearCompleted={this.clearCompleted}/>
            </div>
        );
    }

    todoInput = React.createRef();

    addTodo = event => {
        if (event.key === "Enter") {
            const todoInputValue = this.todoInput.current.value;
            this.setState((prevState, props) => {
                let todos = prevState.todos;
                let idForTodo = prevState.idForTodo + 1;
                todos.push({
                    "id": idForTodo,
                    "title": todoInputValue,
                    "completed": false,
                    "editing": false
                });
                return {todos, idForTodo,}
            });
            this.todoInput.current.value = '';
        }
    };

    removeToDo = index => {
        this.setState((prevState, props) => {
            let todos = prevState.todos;
            // eslint-disable-next-line array-callback-return
            var filteredTodo = todos.filter(function (val, indexA, todo) {
                return index !== val.id;
            });
            return {todos: filteredTodo,}
        });
    };

    checkTodo = (todo, index, event) => {
        this.setState((prevState, props) => {
            let todos = prevState.todos;
            todo.completed = !todo.completed;

            todos.splice(index, 1, todo);

            return {todos}
        });
    };

    checkAllTodo = (event) => {
        this.setState((prevState, props) => {
            let todos = prevState.todos;

            todos.forEach((todo) => {
                todo.completed = true;
            });

            return {todos}
        })
    };

    editTodo = (todo, index, event) => {
        this.setState((prevState, props) => {
            let todos = prevState.todos;
            todo.editing = true;
            todos.splice(index, 1, todo);

            return {todos}
        });
    };


    updateTodo = (todo, index, event) => {
        event.persist();
        this.setState((prevState, props) => {
            let todos = prevState.todos;
            todo.title = event.target.value;
            todo.editing = false;

            todos.splice(index, 1, todo);

            return {todos}
        });
    };

    remaining = () => {
        return this.state.todos.filter(todo => !todo.completed).length;
    };

    anyRemaining = () => {
        return this.remaining() !== 0 ;
    };

    clearCompleted = () => {
        this.setState((prevState, props) => {
            return {todos: prevState.todos.filter(todo => !todo.completed)}
        });
    };

    updateFilter = (filter) => {
        this.setState({filter: filter});
    };

    filteredTodos = () => {
        if (this.state.filter === 'completed') {
            return this.state.todos.filter(todo => todo.completed);
        } else if (this.state.filter === 'active') {
            return this.state.todos.filter(todo => !todo.completed);
        } else {
            return this.state.todos;
        }
    };


    state = {
        filter: 'all',
        idForTodo: 2,
        todos: [
            {
                "id": 1,
                "title": "Check for react app",
                "completed": false,
                "editing": false
            },
            {
                "id": 2,
                "title": "Check for mobx",
                "completed": false,
                "editing": false
            }
        ]
    }
}

export default Todo;