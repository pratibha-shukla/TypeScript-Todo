import React from 'react'; 
import { Login } from '../components/Login'; 

export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const isAuth = localStorage.getItem("isLoggedIn") === "true";
    return isAuth ? <Component {...props} /> : <Login />;
  };
}




