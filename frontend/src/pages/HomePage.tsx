import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function HomePage() {

  const location = useLocation();
  const user = location.state?.res;

  return (
    <>
      <Navbar user={user} />

      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.username || "User"}!
        </h1>

        <p className="mt-2 text-gray-500">
          Manage events and explore activities.
        </p>
      </div>
    </>
  );
}