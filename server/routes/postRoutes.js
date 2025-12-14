import express from "express";
import {
    createPost,
    getPostById,
    deletePost,
} from "../controllers/postController.js";
import upload from "../middleware/uploads.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createPost
);

router.get("/:id", authMiddleware, getPostById);
router.delete("/:id", authMiddleware, deletePost);

export default router;
