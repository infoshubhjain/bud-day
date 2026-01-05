import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { setAuthToken, api } from "../api/client";

interface AuthUser {
  id: string;
  name: string;
  role: "USER" | "ADMIN";
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  setSession: (token: string, user: AuthUser) => void;
  clearSession: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("budday_session");
    if (stored) {
      const parsed = JSON.parse(stored) as { token: string; user: AuthUser };
      setToken(parsed.token);
      setUser(parsed.user);
      setAuthToken(parsed.token);
    }
  }, []);

  const setSession = (newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);
    setAuthToken(newToken);
    window.localStorage.setItem(
      "budday_session",
      JSON.stringify({ token: newToken, user: newUser })
    );
  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
    setAuthToken("");
    window.localStorage.removeItem("budday_session");
  };

  const value: AuthContextValue = { user, token, setSession, clearSession };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};



