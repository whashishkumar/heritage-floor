"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load token from cookie when app mounts
  useEffect(() => {
    const existingToken = Cookies.get("customer_token");
    if (existingToken) {
      setToken(existingToken);
    }
    setLoading(false);
  }, []);

  // ✅ Keep cookie synced with React state
  useEffect(() => {
    if (token) {
      Cookies.set("customer_token", token, {
        path: "/",
        secure: true,
        sameSite: "None",
      });
    } else {
      Cookies.remove("customer_token", { path: "/" });
    }
  }, [token]);

  // ✅ Handlers
  const login = (newToken: string) => setToken(newToken);
  const logout = () => setToken(null);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
}
