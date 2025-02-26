"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: "patient" | "doctor" | "admin";  // ✅ Add role here
}

interface AuthContextProps {
  isAuthOpen: boolean;
  setIsAuthOpen: (isOpen: boolean) => void;
  user: User | null;
  token: string | null;
  loading: boolean;
  loginUser: (token: string, userData: User) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  // ✅ Load user session from localStorage on page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false); // ✅ Done loading
  }, []);

  // ✅ Login function
  const loginUser = (token: string, userData: User) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  
    // ✅ Redirect user to the correct profile
    const profileUrl = userData.role === "doctor" ? "/doctor-profile" : "/profile";
    window.location.href = profileUrl;
  };
  

  // ✅ Logout function
  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthOpen, setIsAuthOpen, user, token, loading, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
