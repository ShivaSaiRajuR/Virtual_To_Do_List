import React, { useState, useRef, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import { CheckIcon, XIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { dispatch } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', payload: todo.id });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(todo.text);
  };

  const handleEditSubmit = () => {
    const trimmedValue = editValue.trim();
    if (trimmedValue) {
      dispatch({
        type: 'EDIT_TODO',
        payload: { id: todo.id, text: trimmedValue },
      });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(todo.text);
    }
  };

  return (
    <li className="group border-b border-gray-100 last:border-0 transition-all duration-200 ease-in-out">
      <div className="flex items-center py-3 px-1">
        <button
          onClick={handleToggle}
          className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center mr-3 transition-colors duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-blue-500'
          }`}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed && <CheckIcon size={14} />}
        </button>

        {isEditing ? (
          <div className="flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleEditSubmit}
              className="flex-1 py-1 px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => {
                setIsEditing(false);
                setEditValue(todo.text);
              }}
              className="ml-2 text-gray-500 hover:text-red-500"
              aria-label="Cancel editing"
            >
              <XIcon size={18} />
            </button>
            <button
              onClick={handleEditSubmit}
              className="ml-2 text-gray-500 hover:text-green-500"
              aria-label="Save edit"
            >
              <CheckIcon size={18} />
            </button>
          </div>
        ) : (
          <>
            <span
              className={`flex-1 transition-all duration-200 ${
                todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
              }`}
            >
              {todo.text}
            </span>
            
            <div className="flex-shrink-0 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleEdit}
                className="p-1 text-gray-400 hover:text-blue-500 rounded transition-colors duration-200"
                aria-label="Edit task"
              >
                <PencilIcon size={16} />
              </button>
              
              <button
                onClick={handleDelete}
                className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors duration-200"
                aria-label="Delete task"
              >
                <TrashIcon size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;