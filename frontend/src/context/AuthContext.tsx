import { createContext, useState, useEffect, useContext } from "react";
import { fetchCurrentUser, logoutUser } from "../services/authApi.js";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // This now automatically sends the token thanks to the interceptor
        const res = await fetchCurrentUser();
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      // 1. Call your backend logout controller (clears httpOnly cookies)
      await logoutUser(); 
      
      // 2. Clear token from local storage
      localStorage.removeItem("accessToken"); 
      
      // 3. Clear global state
      setUser(null);
    } catch (err) {
      console.error("Logout API failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);