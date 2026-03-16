import { createContext, useState, useEffect, useContext } from "react";
import {logoutUser, getUserProfile} from "../services/authApi.js"

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔹 Starts true to block premature redirects

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // withCredentials: true is MANDATORY for sending the HTTP-only cookie
        const res = await getUserProfile();
        setUser(res.data);
      } catch (err) {
        console.log("No active session found.");
        setUser(null);
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