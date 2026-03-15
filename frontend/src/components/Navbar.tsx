import AuthModal from "./AuthModal";

export default function Navbar({ user }) {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">

      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">EMS</a>
      </div>

      <div className="navbar-end">

        {user ? (
          <span className="mr-3 font-semibold">
            {user.username}
          </span>
        ) : (
          <AuthModal />
        )}

      </div>

    </div>
  );
}