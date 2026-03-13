import User from "../models/user.model.js";

// Fetch logged‑in user's profile.
export const getUserProfile = async (req, res) => {
  try {
    const user = await req.user;
    return res.status(200).json({
      name: user.name,
      username: user.username,
      email: user.email,
      contact: user.contact,
      profileImg: user.profileImg,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
    });
  } catch (error) {
    console.log("Error in user profile controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch another user's profile.
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ messsage: "Internal Server error", error: error.message });
  }
};

// Update username, contact, profile image, etc.
export const updateUserProfile = async (req, res) => {
  try {
    const { name, username, email, password, contact, bio, profileImg } = req.body;
    const user = req.user;
    console.log(user);

    if (name) user.name = name;
    if (username) user.username = username;
    if (email) user.email = email;
    if (contact) user.contact = contact;
    if (bio) user.bio = bio;
    if (profileImg) user.profileImg = profileImg;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    await user.save();
    console.log(user);
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.log("Error in user profile update controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Completes profile after Google login.
export const completeProfile = async (req, res) => {
  try {
    const { username, contact } = req.body;
    let { profileImg } = req.body;

    const user = await User.findById(req.user.id);

    user.username = username;
    user.contact = contact;
    user.profileCompleted = true;

    if (profileImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0],
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profileImg, {
        folder: "profile_images",
      });
      profileImg = uploadedResponse.secure_url;
    }

    await user.save();

    res.json({
      message: "Profile completed",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error completing profile" });
  }
};

// Follow/unfollow another user
export const followUnfollowUser = async (req, res) => {
  try {
    const user = req.user;
    const userToFollow = await User.findById(req.params.id);
    if (user._id.toString() === userToFollow._id.toString()) { 
      return res.status(400).json({ message: "Cannot follow yourself" });
    }
    const alreadyFollows = user.following.includes(userToFollow._id);
    if (alreadyFollows) {
      //unfollow
      user.following.pull(userToFollow._id);
      userToFollow.followers.pull(user._id);
    } else {
      //follow
      user.following.push(userToFollow._id);
      userToFollow.followers.push(user._id);
    }
    await user.save();
    await userToFollow.save();
    return res.status(200).json({
      message: `${alreadyFollows ? `${user.username} unfollowed ${userToFollow.username}` : `${user.username} followed ${userToFollow.username}`}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in follow/unfollow controller" });
  }
};

// Get list of followers.
export const getFollowers = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ followers: user.followers.username });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get users being followed.
export const getFollowing = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ "following": user.following });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
