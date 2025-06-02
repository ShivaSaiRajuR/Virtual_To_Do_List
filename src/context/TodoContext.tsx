import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Todo, TodoAction, TodoState } from '../types/todo';

const initialState: TodoState = {
  todos: [],
  filter: 'all'
};

// Load from localStorage if available
const loadInitialState = (): TodoState => {
  try {
    const savedState = localStorage.getItem('todoState');
    return savedState ? JSON.parse(savedState) : initialState;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return initialState;
  }
};

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  let newState: TodoState;

  switch (action.type) {
    case 'ADD_TODO':
      newState = {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            text: action.payload,
            completed: false,
            createdAt: new Date().toISOString()
          }
        ]
      };
      break;

    case 'TOGGLE_TODO':
      newState = {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
      break;

    case 'EDIT_TODO':
      newState = {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      };
      break;

    case 'DELETE_TODO':
      newState = {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
      break;

    case 'SET_FILTER':
      newState = {
        ...state,
        filter: action.payload
      };
      break;

    default:
      return state;
  }

  // Save to localStorage
  localStorage.setItem('todoState', JSON.stringify(newState));
  return newState;
};

interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, loadInitialState());

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('todoState', JSON.stringify(state));
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};