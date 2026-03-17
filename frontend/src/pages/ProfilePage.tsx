import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../services/authApi.js"; // Import API

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false); //
  const [isCompletingProfile, setIsCompletingProfile] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [removeImageFlag, setRemoveImageFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    contact: "",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        contact: user.contact || "",
        bio: user.bio || "",
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
      if (file.size > 10 * 1024 * 1024) {
        setError("Image too large. Maximum size is 10MB.");
        return;
      }
      setSelectedImage(file);
      setRemoveImageFlag(false); // A new file was chosen, so don't remove
      setError(""); // Clear any previous error
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setRemoveImageFlag(true);
    setSelectedImage(null);
    // Set preview to default image
    setImagePreview(
      "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      setError("");
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("contact", form.contact);
      formData.append("bio", form.bio);

      if (selectedImage) {
        formData.append("profileImg", selectedImage);
      }
      if (removeImageFlag) {
        formData.append("removeProfileImg", "true");
      }

      const res = await updateUserProfile(formData);

      // Update user state
      setUser(res.data.user);

      setEditing(false);
      setSelectedImage(null);
      setImagePreview(null);
      setRemoveImageFlag(false);

      // Navigate to home after profile completion
      if (isCompletingProfile && res.data.user?.profileCompleted) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to update profile",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <Link to="/home" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>
      <div className="flex justify-center -mt-8 px-4 pb-10">
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
                key={user?.profileImg || "default-profile-img"} // Add key to force re-render on image change
              />
              {editing && (
                <div className="absolute -bottom-1 -right-1 flex gap-1">
                  <label className="btn btn-circle btn-xs" title="Change Photo">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    📷
                  </label>
                  {(user?.profileImg || imagePreview) && (
                    <button
                      onClick={handleRemoveImage}
                      className="btn btn-circle btn-xs btn-error text-white"
                      title="Remove Photo"
                    >
                      ✕
                    </button>
                  )}
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold">
              {user?.username || user?.name}
            </h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span>
                <span className="font-bold text-base-content">
                  {user?.followers?.length || 0}
                </span>{" "}
                Followers
              </span>
              <span>
                <span className="font-bold text-base-content">
                  {user?.following?.length || 0}
                </span>{" "}
                Following
              </span>
            </div>
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
            <div>
              <label className="label">Bio</label>
              <textarea
                name="bio"
                className="textarea textarea-bordered w-full"
                value={form.bio}
                disabled={!editing}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us a little about yourself"
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
                  disabled={
                    loading || (isCompletingProfile && !form.username.trim())
                  }
                  type="button"
                >
                  {loading
                    ? "Saving..."
                    : isCompletingProfile
                      ? "Complete Profile"
                      : "Save"}
                </button>
                {!isCompletingProfile && (
                  <button
                    className="btn"
                    onClick={() => setEditing(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                )}
              </>
            ) : (
              <button
                className="btn btn-outline"
                onClick={() => setEditing(true)}
                type="button"
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
