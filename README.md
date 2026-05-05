# React + TypeScript + Vite

# project name 
## My-Todo-app

1. Create the Project (using Vite)
npm create vite@latest my-todo-app -- --template react-ts
cd my-todo-app

2. Install Standard Dependencies
npm install


TypeScript Todo App
A robust, functional Todo application built with React and TypeScript. This project demonstrates core CRUD (Create, Read, Update, Delete) operations, state management with Hooks, and type safety using TypeScript.

Features
Add Tasks: Create new todo items with unique IDs.
Toggle Completion: Mark tasks as finished with a visual strike-through.
Edit Mode: Inline editing of existing tasks with "Save" and "Cancel" functionality.
Delete: Remove tasks from the list instantly.
Type Safety: Fully typed props and state using TypeScript interfaces.

 Tech Stack
 React 18 (Functional Components)
 TypeScript (Type Definitions)
 Vite (Fast Development Build Tool)
 CSS3 (Custom Styling)

 Prerequisites
 Node.js (v16 or higher recommended)
 npm (comes with Node.js)

  Setup Instructions
  Clone the Repository
  git clone https://github.com/pratibha-shukla/TypeScript-Todo.git
  cd my-todo-app

  Run the Project Locally
  npm run dev

   Project Structuresrc
   /TodoLogic.tsx: The main container component managing the application state and logic.
   src/types.ts: Contains the Todo interface used for type checking.
   src/data.ts: Provides the InitialTodos mock data for the starting state.
   src/todo.css: Custom styles for the responsive UI.

   Code HighlightsThe 
   application utilizes several React patterns:
   useState: Manages the list of todos, input fields, and the current editing state.
   Type Casting: Uses <Todo[]> to ensure the todos state strictly follows the defined interface.
   Conditional Rendering: Dynamically switches between "View" and "Edit" mode based on the editingId.

This project was initialized with Vite. All logic for handling tasks (Adding, Toggling, Updating, and Deleting) is contained within the TodoLogic component to maintain a clear flow of data.

Commands to Run
Start development server: npm run dev
Build for production: npm run build
Check for Type errors: npm run type-check (or tsc)





