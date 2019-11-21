import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './components/Clock'
import Todo from './components/todo/Todo'
import {inject,observer} from "mobx-react";

@inject('TodoStore')
@observer
class App extends Component{
   render() {
       const TodoStore = this.props.TodoStore;
       console.log(TodoStore.todos);
       return (
           <div className="App">
               <header className="App-header">
                   <h2>My TODO App </h2>
                   <img src={logo} className="App-logo" alt="logo"/>
               </header>
               <Todo />
           </div>
       );
   };


}

export default App;
