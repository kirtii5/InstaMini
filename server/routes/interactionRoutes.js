import express from "express";
import {
    likePost,
    unlikePost,
    addComment,
    getFeed,
} from "../controllers/interactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/posts/:id/like", authMiddleware, likePost);
router.post("/posts/:id/unlike", authMiddleware, unlikePost);
router.post("/posts/:id/comment", authMiddleware, addComment);
router.get("/feed", authMiddleware, getFeed);

export default router;
