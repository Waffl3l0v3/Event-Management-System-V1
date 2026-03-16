import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();
  
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.username || "User"}!</h1>
      </div>
    </>
  );
}