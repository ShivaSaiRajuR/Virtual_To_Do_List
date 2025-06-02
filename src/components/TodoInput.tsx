import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { PlusIcon } from 'lucide-react';

const TodoInput: React.FC = () => {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedTask = task.trim();
    
    if (!trimmedTask) {
      setError('Task cannot be empty');
      return;
    }
    
    dispatch({ type: 'ADD_TODO', payload: trimmedTask });
    setTask('');
    setError('');
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
              if (error) setError('');
            }}
            placeholder="Add a new task..."
            className={`w-full py-3 px-4 border ${
              error ? 'border-red-500' : 'border-gray-200'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
          />
          {error && (
            <p className="text-red-500 text-xs mt-1 absolute">{error}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          aria-label="Add task"
        >
          <PlusIcon size={20} />
        </button>
      </form>
    </div>
  );
};

export default TodoInput;