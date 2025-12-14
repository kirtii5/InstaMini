import Post from "../models/Post.js";

// CREATE POST

export const createPost = async (req, res) => {
    try {
        const { caption, imageUrl } = req.body;

        const uploadedImage = req.file?.path;

        const finalImageUrl = uploadedImage || imageUrl;

        if (!finalImageUrl) {
            return res.status(400).json({
                message: "Either upload an image or provide an image URL",
            });
        }

        const post = await Post.create({
            user: req.user._id,
            imageUrl: finalImageUrl,
            caption,
            likes: [],
            comments: [],
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// GET POST BY ID
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate(
            "user",
            "username"
        );

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE POST
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (!post.user.equals(req.user._id)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await post.deleteOne();
        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


