import {ADD_TODO, DELETE_TASK, TASK_COMPLETED} from '../types/todo.types';

export const addTodo = task => ({
  type: ADD_TODO,
  payload: task,
});

export const taskCompeted = id => ({
  type: TASK_COMPLETED,
  payload: {id},
});

export const deleteTask = id => ({
  type: DELETE_TASK,
  payload: {id},
});
