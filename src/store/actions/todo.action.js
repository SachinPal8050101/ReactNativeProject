import {ADD_TODO} from '../types/todo.types';

export const addTodo = task => ({
  type: ADD_TODO,
  payload: {
    id: 1,
    task,
  },
});
