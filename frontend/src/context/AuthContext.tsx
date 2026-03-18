import { createContext, useState, useEffect, useContext } from "react";
import {logoutUser, getUserProfile} from "../services/authApi.js"

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Try to bootstrap immediate UI from last known user to avoid nav flicker on refresh
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("authUser");
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      // Ensure we only bootstrap valid authenticated user objects
      if (!parsed || typeof parsed !== "object" || !parsed.role) return null;
      return parsed;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true); // 🔹 Starts true to block premature redirects

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // withCredentials: true is MANDATORY for sending the HTTP-only cookie
        const res = await getUserProfile();
        setUser(res.data);
        localStorage.setItem("authUser", JSON.stringify(res.data));
      } catch (err) {
        console.log("No active session found.");
        setUser(null);
        localStorage.removeItem("authUser");
      } finally {
        setLoading(false); // 🔹 Allows the app to render the correct page now
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      // Calls your backend logout controller to clear the cookies
      await logoutUser();
      setUser(null);
      localStorage.removeItem("authUser");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);