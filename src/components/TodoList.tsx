import React from 'react';
import TodoItem from './TodoItem';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types/todo';

const TodoList: React.FC = () => {
  const { state } = useTodo();
  
  const filteredTodos = state.todos.filter((todo: Todo) => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });

  return (
    <div className="mb-4">
      <ul className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
        {filteredTodos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        
        {filteredTodos.length === 0 && (
          <li className="py-6 text-center text-gray-500">
            {state.filter === 'all' 
              ? 'No tasks yet. Add a task to get started!'
              : state.filter === 'active'
                ? 'No active tasks!'
                : 'No completed tasks!'}
          </li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;