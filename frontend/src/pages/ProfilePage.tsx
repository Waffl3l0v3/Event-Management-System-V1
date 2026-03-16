import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../services/authApi.js"; // Import API

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        contact: user.contact || "",
      });
    }
  }, [user]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSave = async () => {
  try {
    const res = await updateUserProfile(form);

    // Let's print EXACTLY what the backend sent us
    console.log("Backend response data:", res.data); 

    // Safely set the user depending on your backend's format:
    // If your backend wraps it in a 'user' property:
    if (res.data.user) {
       setUser(res.data.user);
    } else {
       // If your backend sends the user object directly:
       setUser(res.data);
    }

    setEditing(false);
  } catch (error) {
    console.error("Failed to update profile", error);
  }
};

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-xl bg-base-100 shadow-lg rounded-xl p-6">
          <div className="flex flex-col items-center">
            <img
              src={user?.profileImg || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"}
              className="w-24 h-24 rounded-full object-cover border mb-4"
              alt="Profile"
            />
            <h2 className="text-xl font-bold">{user?.username}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>

          <div className="divider"></div>

          <div className="space-y-4">
            {/* Same inputs as before */}
            <div>
              <label className="label">Name</label>
              <input name="name" className="input input-bordered w-full" value={form.name} disabled={!editing} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Username</label>
              <input name="username" className="input input-bordered w-full" value={form.username} disabled={!editing} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Email</label>
              <input name="email" className="input input-bordered w-full" value={form.email} disabled />
            </div>
            <div>
              <label className="label">Contact</label>
              <input name="contact" className="input input-bordered w-full" value={form.contact} disabled={!editing} onChange={handleChange} />
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-3">
            {editing ? (
              <>
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                <button className="btn" onClick={() => setEditing(false)}>Cancel</button>
              </>
            ) : (
              <button className="btn btn-outline" onClick={() => setEditing(true)}>Edit Profile</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}