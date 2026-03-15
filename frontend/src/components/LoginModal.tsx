import { useState } from "react";
import axios from "axios";

export default function LoginModal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (u) => {
    u.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "/api/auth/login",
        { username, password },
        { withCredentials: true },
      );

      console.log("Login success:", res.data);

      document.getElementById("my_modal_3").close();
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Open Modal Button */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Login
      </button>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          {/* Close Button */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
              <legend className="fieldset-legend text-lg">Login</legend>

              <label className="label">Username</label>
              <input
                type="username"
                className="input"
                placeholder="Username"
                value={username}
                onChange={(u) => setUsername(u.target.value)}
                required
              />

              <label className="label mt-2">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <button
                type="submit"
                className="btn btn-neutral mt-4 w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </fieldset>
          </form>
          {/* <div className="divider">OR</div>
          <GoogleLoginButton /> */}
        </div>
      </dialog>
    </>
  );
}
