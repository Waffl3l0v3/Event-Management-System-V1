import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./authModal"; // Make sure case matches your file
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";

interface NavbarProps {
  toggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export default function Navbar({ toggleSidebar, isSidebarOpen }: NavbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  // Poll backend for unread notification count
  useEffect(() => {
    if (!user) return;

    const fetchUnreadCount = async () => {
      try {
        // Make sure this route matches your backend notification routes (e.g. /api/notifications/unread)
        const res = await fetch("/api/notifications/unread", {
          credentials: "include", // Required to send HTTP-only cookies securely
        });
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.count || 0);
        }
      } catch (error) {
        console.error("Failed to fetch unread notifications", error);
      }
    };

    // Fetch immediately on mount
    fetchUnreadCount();

    // Keep data as realtime as possible by polling every 15 seconds
    const interval = setInterval(fetchUnreadCount, 15000);
    
    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = async () => {
    await logout(); // This now calls the API and clears local storage!
    navigate("/");
  };

  const handleSearch = (e: { key: string; }) => {
    if (e.key === "Enter") {
      // Navigate to search results or filter
      navigate(`/explore?q=${searchQuery}`);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 flex justify-between z-10">
      <div className="navbar-start xl:w-auto">
        {user && (
          <button
            onClick={toggleSidebar}
            className="btn btn-ghost btn-circle mr-2"
            aria-label="Toggle Sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        )}
        <Link
          to={user ? "/home" : "/"}
          className="btn btn-ghost text-xl hover:scale-105 transition-transform duration-200"
        >
          EMS
        </Link>
      </div>

      {user && (
        <div className="navbar-center flex-1 justify-center px-4">
          <div className="form-control w-full max-w-md relative">
            <input
              type="text"
              placeholder="Search events..."
              className="input input-bordered w-full rounded-full bg-base-200 focus:bg-base-100 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
      )}

      <div className="navbar-end flex items-center gap-2 xl:w-auto">
        <ThemeToggle />

        {/* Real-time Notification Bell */}
        {user && (
          <Link
            to="/notifications"
            className="btn btn-ghost btn-circle"
            aria-label="View Notifications"
          >
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="badge badge-xs badge-primary indicator-item animate-pulse">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>
          </Link>
        )}

        {user ? (
          <div className="dropdown dropdown-end">
            {/* 🔹 Added gap and span to show username next to avatar */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost hover:bg-base-200 rounded-btn flex items-center gap-3"
            >
              <span className="font-semibold text-sm">
                {user.username || user.name}
              </span>
              <div className="w-10 h-10 rounded-full border avatar">
                <img
                  className="rounded-full object-cover"
                  alt="User Avatar"
                  src={
                    user.profileImg ||
                    "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                  }
                  key={user.profileImg || "default-navbar-img"} // Add key to force re-render on image change
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="mt-3 z-1 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="menu-title px-4 py-2 opacity-60 wrap-break-word">
                {user.email}
              </li>
              <li>
                <Link to="/profile">View Profile</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <AuthModal />
        )}
      </div>
    </div>
  );
}
