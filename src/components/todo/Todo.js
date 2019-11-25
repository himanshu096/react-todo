import * as React from "react/cjs/react.development";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import TodoCheckAll from "./TodoCheckAll";
import {observer,inject} from "mobx-react";
import ReactPullToRefresh from "react-pull-to-refresh";
import {CircularIndeterminate} from "../ProgressLoader"

@inject('TodoStore') @observer
class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.TodoStore= props.TodoStore;
    }

    componentDidMount(){
       this.TodoStore.getData();
    }

    render() {
        const TodoStore = this.TodoStore;
        return (
            <ReactPullToRefresh
                onRefresh={(reject,resolve)=>this.handleRefresh(reject,resolve,TodoStore)}  >
            <div className="Todo-container">
                <input type="text" className="todo-input" placeholder="What you want to do!!" ref={TodoStore.todoInput}
                       onKeyUp={TodoStore.addTodo}/>

                { !TodoStore.isLoading ? <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300}
                                         transitionLeaveTimeout={300}>
                    {TodoStore.filteredTodos.map((todo, index) =>
                      <TodoItem key={todo.id} todo={todo} index={index} />
                    )}
                </ReactCSSTransitionGroup> :<div className="Center-container"> <CircularIndeterminate/> </div> }

                <TodoCheckAll  TodoStore={TodoStore}  />

                <TodoFilter todos={TodoStore.todos}  clearCompleted={this.clearCompleted}/>
            </div>
            </ReactPullToRefresh>
        );
    }

    todoInput = React.createRef();

    clearCompleted = () => {
        this.setState((prevState, props) => {
            return {todos: prevState.todos.filter(todo => !todo.completed)}
        });
    };

    handleRefresh(resolve, reject,store) {
        store.getData();
    };

}

export default Todo;