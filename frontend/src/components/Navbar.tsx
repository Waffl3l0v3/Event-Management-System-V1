import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./authModal"; // Make sure case matches your file
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    contact: user?.contact || "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await logout(); // This now calls the API and clears local storage!
    navigate("/");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      // Navigate to search results or filter
      navigate(`/explore?q=${searchQuery}`);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 animate-fade-in">
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost text-xl hover:scale-105 transition-transform duration-200"
        >
          EMS
        </Link>
        {user && (
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hover:bg-primary hover:scale-110 transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </div>
            -lg
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/explore">Explore Events</Link>
              </li>
              <li>
                <details>
                  <summary>Categories</summary>
                  <ul className="p-2">
                    <li>
                      <a>All</a>
                    </li>
                    <li>
                      <a>Conferences</a>
                    </li>
                    <li>
                      <a>Workshops</a>
                    </li>
                    <li>
                      <a>Concerts</a>
                    </li>
                    <li>
                      <a>Sports</a>
                    </li>
                  </ul>
                </details>
              </li>
              {user.role === "attendee" && (
                <>
                  <li>
                    <Link to="/my-registrations">My Registrations</Link>
                  </li>
                  <li>
                    <Link to="/saved-events">Saved Events</Link>
                  </li>
                  <li>
                    <Link to="/following">Following Organizers</Link>
                  </li>
                  <li>
                    <Link to="/notifications">Notifications</Link>
                  </li>
                </>
              )}
              {user.role === "organizer" && (
                <>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/my-events">My Events</Link>
                  </li>
                  <li>
                    <Link to="/create-event">Create Event</Link>
                  </li>
                  <li>
                    <Link to="/registrations">Registrations</Link>
                  </li>
                  <li>
                    <Link to="/analytics">Analytics</Link>
                  </li>
                  <li>
                    <Link to="/notifications">Notifications</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>

      {user && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/explore">Explore Events</Link>
            </li>
            <li>
              <details>
                <summary>Categories</summary>
                <ul className="p-2">
                  <li>
                    <a>All</a>
                  </li>
                  <li>
                    <a>Conferences</a>
                  </li>
                  <li>
                    <a>Workshops</a>
                  </li>
                  <li>
                    <a>Concerts</a>
                  </li>
                  <li>
                    <a>Sports</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="input input-bordered w-24 md:w-auto"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
            </li>
            {user.role === "attendee" && (
              <>
                <li>
                  <Link to="/my-registrations">My Registrations</Link>
                </li>
                <li>
                  <Link to="/saved-events">Saved Events</Link>
                </li>
                <li>
                  <Link to="/following">Following Organizers</Link>
                </li>
                <li>
                  <Link to="/notifications">Notifications</Link>
                </li>
              </>
            )}
            {user.role === "organizer" && (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/my-events">My Events</Link>
                </li>
                <li>
                  <Link to="/create-event">Create Event</Link>
                </li>
                <li>
                  <Link to="/registrations">Registrations</Link>
                </li>
                <li>
                  <Link to="/analytics">Analytics</Link>
                </li>
                <li>
                  <Link to="/notifications">Notifications</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      <div className="navbar-end flex items-center gap-2">
        <ThemeToggle />

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
                <button onClick={() => setEditModalOpen(true)}>
                  Edit Profile
                </button>
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

      {/* Edit Profile Modal */}
      <dialog className={`modal ${editModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Profile</h3>
          <form className="py-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={editForm.username}
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contact</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={editForm.contact}
                onChange={(e) =>
                  setEditForm({ ...editForm, contact: e.target.value })
                }
              />
            </div>
          </form>
          <div className="modal-action">
            <button className="btn" onClick={() => setEditModalOpen(false)}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                /* handle save */ setEditModalOpen(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
