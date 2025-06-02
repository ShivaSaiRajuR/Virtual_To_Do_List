export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { id: string; text: string } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' };