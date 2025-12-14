import User from "../models/User.js";
import Post from "../models/Post.js";
const DEFAULT_AVATAR =
    "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg";

export const getMyProfile = async (req, res) => {
    try {
        const user = req.user;

        const posts = await Post.find({ user: user._id })
            .populate("user", "username fullName profileImage")
            .populate("comments.user", "username fullName profileImage")
            .sort({ createdAt: -1 });

        res.json({
            _id: user._id,
            username: user.username,
            profileImage: user.profileImage,
            followersCount: user.followers.length,
            followingCount: user.following.length,
            posts,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


//Search
export const searchUsers = async (req, res) => {
    const { query } = req.query;

    if (!query) return res.json([]);

    const users = await User.find({
        username: { $regex: query, $options: "i" },
        _id: { $ne: req.user._id },
    }).select("_id username profileImage");

    res.json(users);
};


// GET USER PROFILE
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("username profileImage followers following");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const posts = await Post.find({ user: user._id })
            .populate("user", "username fullName profileImage")
            .populate("comments.user", "username fullName profileImage")
            .sort({ createdAt: -1 });

        const isFollowing = req.user.following.includes(user._id);

        res.json({
            _id: user._id,
            username: user.username,
            profileImage: user.profileImage,
            followersCount: user.followers.length,
            followingCount: user.following.length,
            posts,
            isFollowing,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


//Get all user
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } })
            .select("_id username");

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// FOLLOW USER
export const followUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!userToFollow) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userToFollow._id.equals(req.user._id)) {
            return res.status(400).json({ message: "Cannot follow yourself" });
        }

        if (currentUser.following.includes(userToFollow._id)) {
            return res.status(400).json({ message: "Already following" });
        }

        currentUser.following.push(userToFollow._id);
        userToFollow.followers.push(currentUser._id);

        await currentUser.save();
        await userToFollow.save();

        res.json({ message: "User followed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// UNFOLLOW USER
export const unfollowUser = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!userToUnfollow) {
            return res.status(404).json({ message: "User not found" });
        }

        currentUser.following = currentUser.following.filter(
            (id) => !id.equals(userToUnfollow._id)
        );

        userToUnfollow.followers = userToUnfollow.followers.filter(
            (id) => !id.equals(currentUser._id)
        );

        await currentUser.save();
        await userToUnfollow.save();

        res.json({ message: "User unfollowed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


export const updateProfileImage = async (req, res) => {
    try {
        // REMOVE PROFILE IMAGE
        if (req.body.remove === "true") {
            req.user.profileImage = DEFAULT_AVATAR;
            await req.user.save();

            return res.json({
                message: "Profile image reset",
                profileImage: DEFAULT_AVATAR,
            });
        }

        // UPLOAD NEW IMAGE
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "Image is required" });
        }

        req.user.profileImage = req.file.path;
        await req.user.save();

        res.json({
            message: "Profile image updated",
            profileImage: req.user.profileImage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getFollowers = async (req, res) => {
    const user = await User.findById(req.params.id)
        .populate("followers", "username profileImage");

    if (!user) return res.status(404).json([]);

    const result = user.followers.map((u) => ({
        _id: u._id,
        username: u.username,
        profileImage: u.profileImage,
        isFollowing: req.user.following.includes(u._id),
    }));

    res.json(result);
};

export const getFollowing = async (req, res) => {
    const user = await User.findById(req.params.id)
        .populate("following", "username profileImage");

    if (!user) return res.status(404).json([]);

    const result = user.following.map((u) => ({
        _id: u._id,
        username: u.username,
        profileImage: u.profileImage,
        isFollowing: true,
    }));

    res.json(result);
};
