import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./authModal"; // Make sure case matches your file
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // This now calls the API and clears local storage!
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">EMS</Link>
      </div>

      <div className="navbar-end flex items-center gap-2">
        <ThemeToggle />

        {user ? (
          <div className="dropdown dropdown-end">
            {/* 🔹 Added gap and span to show username next to avatar */}
            <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-base-200 rounded-btn flex items-center gap-3">
              <span className="font-semibold text-sm">
                {user.username}
              </span>
              <div className="w-10 h-10 rounded-full border avatar">
                <img
                  className="rounded-full object-cover"
                  alt="User Avatar"
                  src={user.profileImg || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"}
                />
              </div>
            </div>
            
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li className="menu-title px-4 py-2 opacity-60 break-words">{user.email}</li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={handleLogout} className="text-red-500 hover:bg-red-50">Logout</button></li>
            </ul>
          </div>
        ) : (
          <AuthModal />
        )}
      </div>
    </div>
  );
}