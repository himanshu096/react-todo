import {Observable,computed,action} from 'mobx';

class TodoStore{

 @Observable filter: 'all';
 @Observable idForTodo: 2;
 @Observable todos: [
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
        ];
}

const store = new TodoStore();

export default store;