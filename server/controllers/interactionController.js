import Post from "../models/Post.js";
import User from "../models/User.js";

// LIKE POST
export const likePost = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.some(
        (id) => id.equals(req.user._id)
    );

    if (alreadyLiked) {
        return res.status(400).json({ message: "Already liked" });
    }

    post.likes.push(req.user._id);
    await post.save();

    res.json({ message: "Post liked" });
};

// UNLIKE POST
export const unlikePost = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    post.likes = post.likes.filter(
        (id) => !id.equals(req.user._id)
    );

    await post.save();
    res.json({ message: "Post unliked" });
};

// ADD COMMENT
export const addComment = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: "Comment text required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
        user: req.user._id,
        text,
    });

    await post.save();
    res.json({ message: "Comment added" });
};

// FEED
export const getFeed = async (req, res) => {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
        user: { $in: user.following },
    })
        .populate("user", "username profileImage")
        .populate("comments.user", "username profileImage")
        .sort({ createdAt: -1 });

    res.json(posts);
};
