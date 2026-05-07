


import { type Todo } from '../types'; // Adjust path based on your folder

interface TodoItemProps {
  item: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ item, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className="todo-item">
      <input 
        type="checkbox" 
        checked={item.completed} 
        onChange={() => onToggle(item.id)} 
      />
      <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
        {item.todo}
      </span>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
