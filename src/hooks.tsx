import React, { useReducer, useState, useMemo, useCallback, useEffect } from "react";
import { InitialTodos } from "./data";
import { type Todo } from "./types";
import "./todo.css"; 


// 1. useReducer: The "Manager" that handles all logic in one place
// 1. useReducer: The logic manager
const todoReducer = (state: Todo[], action: any) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter(t => t.id !== action.payload);
    case "TOGGLE":
      return state.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t);
    case "UPDATE":
      return state.map(t => t.id === action.id ? { ...t, todo: action.text } : t);
    default:
      return state;
  }
};

export const HookTodoLogic = () => {
  // --- State & Reducer ---
  const [todos, dispatch] = useReducer(todoReducer, InitialTodos);
  const [inputValue, setInputValue] = useState("");
  
  // FIXED: Added missing states for editing
  const [editValue, setEditValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

    // 2. useCallback: "Freezes" the function so it doesn't rebuild on every render
  // Useful if you pass this function to a child component
  // 2. useCallback: Memoized delete function
  const handleDelete = useCallback((id: number) => {
    dispatch({ type: "DELETE", payload: id });
  }, []);

   // 3. useMemo: "Remembers" a calculated value
  // Only recalculates if [todos] changes. Good for performance.
  // 3. useMemo: Optimized calculation
  const completedCount = useMemo(() => {
    return todos.filter(t => t.completed).length;
  }, [todos]);


// 4. useEffect with Cleanup: Handling external events
  // 4. useEffect with Cleanup: Window listener
  useEffect(() => {
    const onResize = () => console.log("Window resized!");
    window.addEventListener("resize", onResize);
   // CLEANUP: Runs when the component is destroyed
    return () => {
      window.removeEventListener("resize", onResize);
      console.log("Cleanup done!");
    };
  }, []);

  // --- Handlers ---
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newItem: Todo = { id:  Date.now(), todo: inputValue, completed: false };
    dispatch({ type: "ADD", payload: newItem });
    setInputValue("");
  };

  return (
    <div className="todo-container">
      <h1>ToDo List</h1>
      <p>Completed Tasks: {completedCount}</p>
      
      <form onSubmit={handleAdd} className="input-group">
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Add a new task..." 
        />
        <button type="submit" className="add-btn">Add task</button>
      </form>

      <ul className="todo-list">
        {todos.map((item) => (
          <li key={item.id} className="todo-item">
            <input 
              type="checkbox" 
              className="todo-checkbox" 
              checked={item.completed} 
              onChange={() => dispatch({ type: "TOGGLE", payload: item.id })} 
            />

            {editingId === item.id ? (
              <div className="edit-mode-container">
                <input 
                  className="edit-input" 
                  value={editValue} 
                  onChange={(e) => setEditValue(e.target.value)} 
                  autoFocus 
                />
                <div className="button-group">
                  <button 
                    className="save-btn" 
                    onClick={() => {
                      dispatch({ type: "UPDATE", id: item.id, text: editValue });
                      setEditingId(null);
                    }}
                  >
                    Save
                  </button>
                  <button className="cancel-btn" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span 
                  className="item-text" 
                  style={{ textDecoration: item.completed ? "line-through" : "none" }}
                >
                  {item.todo}
                </span>
                <div className="button-group">
                  <button 
                    className="edit-btn" 
                    onClick={() => {
                      setEditingId(item.id);
                      setEditValue(item.todo);
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
