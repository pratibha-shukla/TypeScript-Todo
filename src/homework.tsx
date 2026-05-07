


// Implement 3 custom hooks (examples: useTheme, useLocalStorage, useDebounce) 
// Implement 1 hoc with functional component syntax (examples: withAuth, withErrorBoundary)


// useTheme (Managing App Appearance)

// 1 --- custom hooks 3

//A---- import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Optional: Apply theme class to the body tag
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return { theme, toggleTheme };
};

//B---useLocalStorage (Syncing State with Browser Storage)
// import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}
//C.-- useDebounce (Delaying Performance-Heavy Tasks)

import { useState, useEffect } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // CLEANUP: If the user types again before the delay is over, reset the timer
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

//2----. One Higher-Order Component (HOC)

import React from 'react';

// This is the HOC function
export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

    if (!isAuthenticated) {
      return <h1>Access Denied. Please log in.</h1>;
    }

    // If logged in, return the original component with its props
    return <Component {...props} />;
  };
}

// --- Usage ---
// const ProtectedDashboard = withAuth(Dashboard);

// The Error Boundary Class

// import React, { Component, ErrorInfo, ReactNode } from "react";

// interface Props { children: ReactNode; }
// interface State { hasError: boolean; }

// class ErrorBoundary extends Component<Props, State> {
//   state: State = { hasError: false };

//   // This updates the state so we can show a "Fallback" UI
//   static getDerivedStateFromError(_: Error): State {
//     return { hasError: true };
//   }

//   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     console.error("Uncaught error:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return <h1>Something went wrong. Please refresh.</h1>;
//     }
//     return this.children;
//   }
// }

//----2. The withErrorBoundary HOC

// export function withErrorBoundary<T extends object>(Component: React.ComponentType<T>) {
//   return (props: T) => (
//     <ErrorBoundary>
//       <Component {...props} />
//     </ErrorBoundary>
//   );
// }

// 3. How to use it

// const MyList = () => {
//   // If this code breaks, only this part of the screen shows an error
//   return <div>My Todo List Items</div>;
// };

// // Wrap it!
// export default withErrorBoundary(MyList);



