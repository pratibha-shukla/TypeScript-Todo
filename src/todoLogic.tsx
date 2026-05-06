import { InitialTodos } from "./data"
import { useState } from "react";
import { type Todo} from "./types"
import "./todo.css"; 

/**
 * TodoLogic Component
 * 
 * A functional component that manages the core logic for a Todo application.
 * Features include: Create, Read, Update, Delete (CRUD) and completion toggling.
 * 
 * @returns {tSX.Element} The rendered Todo List UI.
 */
export const TodoLogic = () => {

    // --- State Hooks ---
  const[todos, setTodos] = useState<Todo[]>(InitialTodos);
  const[inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const[editingId, setEditingId] = useState<number | null>(null);

   /**
   * Handles the addition of a new task.
   * @param {React.ChangeEvent} e - The form submission event.
   */

  const handleAdd = (e: React.ChangeEvent) => {
    e.preventDefault();  // Prevents the page from refreshing
    if(!inputValue.trim()) return; // Don't add empty tasks

    const newItem: Todo = {
      id:Date.now(),
      todo: inputValue,
      completed: false,
    };
    setTodos(prev => [...prev,newItem]); // Add new item to the state
    setInputValue("");  // Clear the input box

  };
    /**
   * Removes a todo item from the list by its unique ID.
   * @param {number} id - The ID of the task to delete.
   */

  const handleDelete = (id: number) => {
   setTodos(prev => prev.filter(t => t.id !== id));

  };


   /**
   * Toggles the completion status of a specific task.
   * @param {number} id - The ID of the task to toggle.
   */
  const handleToggle = (id: number) => {
    setTodos(prev => prev.map(t => t.id ===id ? {...t, completed: !t.completed} : t));

  };

    /**
   * Initializes the editing state for a specific task.
   * @param {number} id - The ID of the task being edited.
   * @param {string} currentText - The current text value of the task.
   */
 const startEdit = (id: number, currentText: string) => {
  setEditingId(id);
  setEditValue(currentText);

  
 };

  /**
   * Persists the updated text for an existing task.
   * @param {number} id - The ID of the task to update.
   */
 const handleUpdate = (id: number) => {
   if (!editValue.trim()) return; 
  setTodos(prev => prev.map(t => t.id ===id ? {...t, todo: editValue} : t));
 setEditingId(null);

 }

  return(
    <div className="todo-container">
      <h1>ToDo List</h1>

      <form onSubmit={handleAdd}  className="input-group">
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
        placeholder="add a new task..."
        />

        <button type="submit" className="add-btn"> Add task</button>

      </form>

      <ul className="todo-list">
     {todos.map((item) => (
      <li key={item.id} className="todo-item">

        <input type = "checkbox"  className="todo-checkbox" checked={item.completed}
        onChange= { () => handleToggle(item.id)}/>
      

        {editingId === item.id ? (
           <div className="edit-mode-container">
                <input
                  className="edit-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  autoFocus
                />
                <div className="button-group">

            <button className="save-btn" onClick={() => handleUpdate(item.id)}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>

        ) : (
           

          <>
            <span className="item-text" style={{textDecoration: item.completed? "line-through" : "none"}}>{item.todo}</span>
           
                
                <div className="button-group">
                  <button className="edit-btn" onClick={() => startEdit(item.id, item.todo)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};