import express from "express";
import upload from "../middleware/uploads.js";
import {
    searchUsers,
    getMyProfile,
    getUserProfile,
    getAllUsers,
    followUser,
    unfollowUser,
    updateProfileImage,
    getFollowers,
    getFollowing
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.get("/search", authMiddleware, searchUsers);
router.get("/:id", authMiddleware, getUserProfile);
router.get("/", authMiddleware, getAllUsers);
router.post("/:id/follow", authMiddleware, followUser);
router.post("/:id/unfollow", authMiddleware, unfollowUser);
router.put(
    "/me/profile-image",
    authMiddleware,
    upload.single("image"),
    updateProfileImage
);
router.get("/:id/followers", authMiddleware, getFollowers);
router.get("/:id/following", authMiddleware, getFollowing);



export default router;
