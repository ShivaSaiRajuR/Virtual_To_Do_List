import React from 'react';
import { TodoProvider } from './context/TodoContext';
import TodoApp from './components/TodoApp';

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen animated-gradient flex items-center justify-center p-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>
        <TodoApp />
      </div>
    </TodoProvider>
  );
}

export default App;