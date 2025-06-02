import React from 'react';
import { useTodo } from '../context/TodoContext';

const TodoFilter: React.FC = () => {
  const { state, dispatch } = useTodo();
  
  const setFilter = (filter: 'all' | 'active' | 'completed') => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };
  
  const completedCount = state.todos.filter(todo => todo.completed).length;
  const totalCount = state.todos.length;
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-4 pt-4 border-t border-gray-100">
      <div className="text-sm text-gray-500 mb-3 sm:mb-0">
        {completedCount} of {totalCount} tasks completed
      </div>
      
      <div className="flex space-x-1">
        <FilterButton 
          active={state.filter === 'all'} 
          onClick={() => setFilter('all')}
        >
          All
        </FilterButton>
        
        <FilterButton 
          active={state.filter === 'active'} 
          onClick={() => setFilter('active')}
        >
          Active
        </FilterButton>
        
        <FilterButton 
          active={state.filter === 'completed'} 
          onClick={() => setFilter('completed')}
        >
          Completed
        </FilterButton>
      </div>
    </div>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  active, 
  onClick, 
  children 
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
        active 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
};

export default TodoFilter;