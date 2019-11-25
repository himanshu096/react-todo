import React from 'react';
import { observable, action, computed,configure,runInAction } from 'mobx';
import {addTodo,db,getFirebaseTodos,deleteTodo,updateTodo} from '../firebase';
configure({enforceActions: true});

class TodoStore {
  @observable todoInput =  React.createRef();
  @observable filter = 'all';
  @observable isLoading = false;
  @observable todos = [
  ];

  @action addTodo = async event => {
          if (event.key === "Enter") {
              const todoInputValue = this.todoInput.current.value;

              if(todoInputValue.trim().lenght === 0){
              return;
              }



              var data  = await addTodo({
                                    title:todoInputValue,
                                    editing:false,
                                    completed:false,
                                    });

               runInAction(()=>{
                 this.todos.push(data);
                this.todoInput.current.value = '';
               });

          }
      };

  @action removeToDo = id => {
  const index = this.todos.findIndex(item => item.id === id);
  deleteTodo(id);
            this.todos.splice(index, 1);
          };

  @action checkTodo = (todo, index, event) => {
  todo.completed = !todo.completed;
                    this.todos.splice(index, 1, todo);
                    updateTodo(todo);

          };

  @action checkAllTodo = (event) => {
             this.todos.forEach((todo) => {
                                   todo.completed = true;
                                   updateTodo(todo);
                               });
          };

  @action editTodo = (todo, index, event) => {

                              todo.editing = true;
                              this.todos.splice(index, 1, todo);
          };


  @action updateTodo = (todo, index, event) => {
              event.persist();
              todo.title = event.target.value;
                                todo.editing = false;

              updateTodo(todo);

                                this.todos.splice(index, 1, todo);
          };

  @computed get remaining() {
          return this.todos.filter(todo => !todo.completed).length;
      };

  @computed get anyRemaining() {
          return this.remaining !== 0 ;
      };

  @action updateFilter = (filter) => {
              this.filter = filter;
          };

  @computed get filteredTodos() {
              if (this.filter === 'completed') {
                  return this.todos.filter(todo => todo.completed);
              } else if (this.filter === 'active') {
                  return this.todos.filter(todo => !todo.completed);
              } else {
                  return this.todos;
              }
          };

  @action clearCompleted = async() => {
           var completed = this.todos.filter((todo => todo.completed));

           for (var i = 0; i < completed.length; i++){
               await deleteTodo(completed[i].id);
           }
        this.getData();
         };

  @action async getData()  {
    this.isLoading = true;
    var todoData = await getFirebaseTodos();
    runInAction(()=>{
    this.isLoading = false;
    this.todos = todoData;
    });
          }
}

const store = new TodoStore();
export default store;
