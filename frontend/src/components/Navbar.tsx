import LoginModal from "./LoginModal";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">EMS</a>
        </div>
      </div>

      {/* <div className="navbar-end">
            <a href="/login" className="btn btn-outline btn-primary mr-3">Login</a>
      </div> */}
          <LoginModal />
          
    </div>
  );
}
