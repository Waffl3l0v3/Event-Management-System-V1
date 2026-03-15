import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { loginUser, registerUser, googleLogin } from "../services/authApi.js";
import { useNavigate } from "react-router-dom";
export default function AuthModal() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginusername, setloginUsername] = useState("");
  const [loginpassword, setloginPassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    const res = await loginUser({
      username:loginusername,
      password:loginpassword,
    });

    console.log("Login success:", res.data);

    navigate("/home", { state: { res: res.data } });

    document.getElementById("auth_modal")?.close();

  } catch (err) {
    setError(err.response?.data?.error || "Login failed");
  } finally {
    setLoading(false);
  }
};

  const handleRegister = async (role) => {
  try {
    setLoading(true);
    setError("");

    const res = await registerUser({
      name,
      username,
      email,
      password,
      role,
    });

    console.log("Register success:", res.data);

    // switch to login mode
    setMode("login");

  } catch (err) {
    setError(err.response?.data?.error || "Register failed");
  } finally {
    setLoading(false);
  }
};

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await googleLogin(credentialResponse.credential);

      console.log(res.data);

      document.getElementById("auth_modal").close();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("auth_modal").showModal()}
      >
        Login
      </button>

      <dialog id="auth_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle absolute right-2 top-2">
              ✕
            </button>
          </form>

          {mode === "login" && (
            <form onSubmit={handleLogin}>
              <h3 className="font-bold text-lg mb-4">Login</h3>

              <input
                className="input w-full mb-2"
                placeholder="Username"
                value={loginusername}
                onChange={(e) => setloginUsername(e.target.value)}
              />

              <input
                type="password"
                className="input w-full mb-3"
                placeholder="Password"
                value={loginpassword}
                onChange={(e) => setloginPassword(e.target.value)}
              />

              {error && <p className="text-red-500">{error}</p>}

              <button className="btn btn-neutral w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}

          {mode === "register" && (
            <div>
              <h3 className="font-bold text-lg mb-4">Register</h3>

              <input
                className="input w-full mb-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="input w-full mb-2"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                className="input w-full mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="input w-full mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-red-500">{error}</p>}

              <button
                type="button"
                className="btn w-full mb-2"
                onClick={() => handleRegister("attendee")}
              >
                Register as Attendee
              </button>

              <button
                type="button"
                className="btn btn-secondary w-full"
                onClick={() => handleRegister("organizer")}
              >
                Register as Organizer
              </button>
            </div>
          )}

          <div className="divider">OR</div>

          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google Login Failed")}
          />

          <div className="text-center mt-3">
            {mode === "login" ? (
              <button className="link" onClick={() => setMode("register")}>
                Create Account
              </button>
            ) : (
              <button className="link" onClick={() => setMode("login")}>
                Back to Login
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
