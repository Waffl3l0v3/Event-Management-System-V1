import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import Context
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

// 🔒 New Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  // 1. MUST WAIT FOR BACKEND TO RESPOND
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // 2. ONLY REDIRECT IF WE ARE SURE THERE IS NO USER
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 3. RENDER THE SECURE PAGE
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}