/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setiIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, setiIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Auth Context was used outside of auth provider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
