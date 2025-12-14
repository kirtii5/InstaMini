import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import Post from "./models/Post.js";

dotenv.config();

/* ---------- CONNECT ---------- */
await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected");

/* ---------- CONFIG ---------- */
const SEED_EMAILS = [
    "aanya@gmail.com",
    "rohan@gmail.com",
    "ishita@gmail.com",
    "arjun@gmail.com",
    "mehul@gmail.com",
    "kavya@gmail.com",
];

const DEMO_PASSWORD = "password123";

/* ---------- HELPERS ---------- */
const hashPassword = async (pwd) => bcrypt.hash(pwd, 10);

const randomAvatar = () =>
    `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70) + 1}`;

const postImages = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "https://images.unsplash.com/photo-1503264116251-35a269479413",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
];

const commentsPool = [
    "Clean 🔥",
    "Looks sick 👌",
    "Very aesthetic",
    "Love this",
    "Minimal vibes",
];

/* ---------- CLEAN ONLY SEEDED DATA ---------- */
const seededUsers = await User.find({ email: { $in: SEED_EMAILS } });
const seededUserIds = seededUsers.map((u) => u._id);

await Post.deleteMany({ user: { $in: seededUserIds } });
await User.deleteMany({ _id: { $in: seededUserIds } });

console.log("Old seeded users & posts removed");

/* ---------- CREATE USERS ---------- */
const usersData = [
    { username: "aanya.codes", email: "aanya@gmail.com" },
    { username: "rohan.dev", email: "rohan@gmail.com" },
    { username: "ishita.js", email: "ishita@gmail.com" },
    { username: "arjun.builds", email: "arjun@gmail.com" },
    { username: "mehul.tech", email: "mehul@gmail.com" },
    { username: "kavya.ui", email: "kavya@gmail.com" },
];

const users = [];

for (const u of usersData) {
    const user = await User.create({
        username: u.username,
        email: u.email,
        password: await hashPassword(DEMO_PASSWORD),
        profileImage: randomAvatar(),
        followers: [],
        following: [],
    });

    users.push(user);
    console.log(`User created: ${user.username}`);
}

/* ---------- MUTUAL FOLLOW ---------- */
for (let user of users) {
    for (let other of users) {
        if (
            user._id.toString() !== other._id.toString() &&
            Math.random() > 0.5
        ) {
            user.following.push(other._id);
            other.followers.push(user._id);
        }
    }
}

await Promise.all(users.map((u) => u.save()));
console.log("Followers synced");

/* ---------- POSTS ---------- */
for (let i = 0; i < users.length; i++) {
    const post = await Post.create({
        user: users[i]._id,
        imageUrl: postImages[i % postImages.length],
        caption: "Late night coding 💻",
        likes: [],
        comments: [],
    });

    /* ---------- 1 LIKE ---------- */
    const liker =
        users[(i + 1) % users.length];
    post.likes.push(liker._id);

    /* ---------- 3 COMMENTS ---------- */
    for (let j = 0; j < 3; j++) {
        const commenter =
            users[(i + j + 2) % users.length];

        post.comments.push({
            user: commenter._id,
            text: commentsPool[j],
        });
    }

    await post.save();
    console.log(`Post created for ${users[i].username}`);
}

console.log("✅ Seed completed successfully");
process.exit();
