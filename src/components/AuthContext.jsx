import React, { createContext, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Route {...rest} element={isAuthenticated ? children : <Navigate to="/login" />} />
    </AuthContext.Provider>
  );
};