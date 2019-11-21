import React from 'react';
import { observable, action, computed } from 'mobx';

class TodoStore {
  @observable todoInput =  React.createRef();
  @observable filter = 'all';
  @observable idForTodo = 3;
  @observable todos = [
    {
      'id': 1,
      'title': 'Finish MobX Screencast',
      'completed': false,
      'editing': false,
    },
    {
      'id': 2,
      'title': 'Take over MobX world',
      'completed': false,
      'editing': false,
    },
  ];

  @action addTodo = event => {
          if (event.key === "Enter") {
              const todoInputValue = this.todoInput.current.value;

              if(todoInputValue.trim().lenght === 0){
              return;
              }

              this.todos.push({
              id:this.idForTodo,
              title:todoInputValue,
              editing:false,
              completed:false,
              });

              this.idForTodo++;
              this.todoInput.current.value = '';
          }
      };

  @action removeToDo = id => {
  const index = this.todos.findIndex(item => item.id === id);
            this.todos.splice(index, 1);
          };

  @action checkTodo = (todo, index, event) => {
  todo.completed = !todo.completed;
                    this.todos.splice(index, 1, todo);

          };

  @action checkAllTodo = (event) => {
             this.todos.forEach((todo) => {
                                   todo.completed = true;
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

  @action clearCompleted() {
         return this.todos = this.todos.filter(todo => !todo.completed)};
}

const store = new TodoStore();
export default store;
