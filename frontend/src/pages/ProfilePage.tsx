import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile, completeProfile } from "../services/authApi.js"; // Import API

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [isCompletingProfile, setIsCompletingProfile] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

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

      // Check if this is a Google user who needs to complete profile
      if (user.authProvider === "google" && !user.profileCompleted) {
        setIsCompletingProfile(true);
        setEditing(true);
      }
    }
  }, [user]);

  // If no user, show loading or redirect
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setError("");
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("contact", form.contact);

      if (selectedImage) {
        formData.append("profileImg", selectedImage);
      }

      let res;

      if (isCompletingProfile) {
        // Use completeProfile API for Google users completing their profile
        const completeData = {
          username: form.username,
          contact: form.contact,
        };
        if (selectedImage) {
          completeData.profileImg = selectedImage;
        }
        res = await completeProfile(completeData);
        setIsCompletingProfile(false);
      } else {
        // Use regular updateUserProfile for existing users
        res = await updateUserProfile(formData);
      }

      // Update user state
      if (res.data.user) {
        setUser(res.data.user);
      } else {
        setUser(res.data);
      }

      setEditing(false);
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Failed to update profile", error);
      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to update profile",
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-xl bg-base-100 shadow-lg rounded-xl p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={
                  imagePreview ||
                  user?.profileImg ||
                  "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                }
                className="w-24 h-24 rounded-full object-cover border mb-4"
                alt="Profile"
              />
              {editing && (
                <label className="absolute bottom-2 right-0 btn btn-circle btn-sm">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  📷
                </label>
              )}
            </div>
            <h2 className="text-xl font-bold">
              {user?.username || user?.name}
            </h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            {isCompletingProfile && (
              <p className="text-blue-500 text-sm mt-2">
                Please complete your profile to continue
              </p>
            )}
          </div>

          <div className="divider"></div>

          <div className="space-y-4">
            <div>
              <label className="label">Name</label>
              <input
                name="name"
                className="input input-bordered w-full"
                value={form.name}
                disabled={!editing || isCompletingProfile}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">
                Username{" "}
                {isCompletingProfile && <span className="text-red-500">*</span>}
              </label>
              <input
                name="username"
                className="input input-bordered w-full"
                value={form.username}
                disabled={!editing}
                onChange={handleChange}
                required={isCompletingProfile}
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                name="email"
                className="input input-bordered w-full"
                value={form.email}
                disabled
              />
            </div>
            <div>
              <label className="label">Contact</label>
              <input
                name="contact"
                className="input input-bordered w-full"
                value={form.contact}
                disabled={!editing}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <div className="flex justify-end mt-6 gap-3">
            {editing ? (
              <>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={isCompletingProfile && !form.username.trim()}
                >
                  {isCompletingProfile ? "Complete Profile" : "Save"}
                </button>
                {!isCompletingProfile && (
                  <button className="btn" onClick={() => setEditing(false)}>
                    Cancel
                  </button>
                )}
              </>
            ) : (
              <button
                className="btn btn-outline"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
