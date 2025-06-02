import React from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { useTodo } from '../context/TodoContext';

const TodoApp: React.FC = () => {
  const { state } = useTodo();
  
  return (
    <div className="w-full max-w-lg glass-effect rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
        <h1 className="text-2xl font-bold text-white mb-1">My Tasks</h1>
        <p className="text-blue-100 text-sm">
          {state.todos.filter(todo => !todo.completed).length} tasks remaining
        </p>
      </div>
      
      <div className="p-6">
        <TodoInput />
        
        {state.todos.length > 0 ? (
          <>
            <TodoList />
            <TodoFilter />
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">Your task list is empty</p>
            <p className="text-sm text-gray-400">Add a new task to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;