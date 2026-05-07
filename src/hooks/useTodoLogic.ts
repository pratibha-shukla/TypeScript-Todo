

import { useState } from "react";
import { type Todo } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export const useTodoLogic = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("my_todos", []);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = (e: React.ChangeEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newItem = { id: Date.now(), todo: inputValue, completed: false };
    setTodos([...todos, newItem]);
    setInputValue("");
  };

  const handleDelete = (id: number) => setTodos(todos.filter(t => t.id !== id));
  
  const handleToggle = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return { todos, inputValue, setInputValue, handleAdd, handleDelete, handleToggle };
};
