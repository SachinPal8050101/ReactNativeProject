import {ADD_TODO, DELETE_TASK, TASK_COMPLETED} from '../types/todo.types';

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const newTodo = {
        id: state.todos.length ? state.todos[state.todos.length - 1].id + 1 : 1,
        title: action.payload.title,
        subTitle: action.payload.subTitle,
        isCompleted: false,
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }
    case TASK_COMPLETED: {
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? {...todo, isCompleted: !todo.isCompleted}
            : todo,
        ),
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };
    }
    default:
      return state;
  }
};

export default todoReducer;
