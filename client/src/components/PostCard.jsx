import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

const DEFAULT_AVATAR =
  "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg";

export default function PostCard({ post, refreshFeed }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [comment, setComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [loading, setLoading] = useState(false);

  /* 🔑 Backend is source of truth */
  useEffect(() => {
    const likedFromDB = post.likes.some((id) => id.toString() === userId);
    setLiked(likedFromDB);
    setLikeCount(post.likes.length);
  }, [post.likes, userId]);

  const isOwner = post.user._id === userId;

  const commentsToShow = showAllComments
    ? post.comments
    : post.comments.slice(-2);

  /* ❤️ Like / Unlike */
  const handleLikeToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (liked) {
        await api.post(`/posts/${post._id}/unlike`);
        setLiked(false);
        setLikeCount((c) => c - 1);
      } else {
        await api.post(`/posts/${post._id}/like`);
        setLiked(true);
        setLikeCount((c) => c + 1);
      }
    } catch (err) {
      if (err.response?.data?.message === "Already liked") {
        setLiked(true);
      }
    } finally {
      setLoading(false);
      refreshFeed && refreshFeed();
    }
  };

  /* 💬 Comment */
  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await api.post(`/posts/${post._id}/comment`, { text: comment });
    setComment("");
    refreshFeed && refreshFeed();
  };

  /* 🗑 Delete post */
  const handleDelete = async () => {
    await api.delete(`/posts/${post._id}`);
    refreshFeed && refreshFeed();
  };

  const formatTime = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
  };

  return (
    <div className="bg-white rounded shadow p-4 relative">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(`/user/${post.user._id}`)}>
          <img
            src={post.user.profileImage || DEFAULT_AVATAR}
            className="w-8 h-8 rounded-full object-cover"
            alt="profile"
          />
          <span className="font-semibold">{post.user.username}</span>
        </div>

        {isOwner && (
          <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)}>⋮</button>
            {showMenu && (
              <button
                onClick={handleDelete}
                className="absolute right-0 px-4 py-2 text-sm text-red-500 bg-white border rounded shadow">
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      {/* IMAGE */}
      <img
        src={post.imageUrl}
        alt="post"
        className="w-full h-64 object-cover rounded mb-2"
      />

      {/* ACTIONS */}
      <div className="flex items-center gap-4 mb-1">
        <button onClick={handleLikeToggle}>
          {liked ? (
            <AiFillHeart size={24} className="text-red-500" />
          ) : (
            <AiOutlineHeart size={24} />
          )}
        </button>

        <button onClick={() => setShowAllComments(true)}>
          <FaRegComment size={22} />
        </button>
      </div>

      {/* LIKES */}
      <p className="text-sm font-semibold mb-1">{likeCount} likes</p>

      {/* CAPTION */}
      {post.caption && (
        <p className="text-sm mb-1">
          <span
            className="font-semibold cursor-pointer mr-1"
            onClick={() => navigate(`/user/${post.user._id}`)}>
            {post.user.username}
          </span>
          {post.caption}
        </p>
      )}

      {/* VIEW ALL */}
      {post.comments.length > 2 && !showAllComments && (
        <button
          onClick={() => setShowAllComments(true)}
          className="text-sm text-gray-500 mb-1">
          View all {post.comments.length} comments
        </button>
      )}

      {/* COMMENTS */}
      <div className="space-y-2 text-sm">
        {commentsToShow.map((c, i) => (
          <div key={i} className="flex items-start gap-2">
            <img
              src={c.user.profileImage || DEFAULT_AVATAR}
              className="w-6 h-6 rounded-full object-cover cursor-pointer"
              alt="comment-user"
              onClick={() => navigate(`/user/${c.user._id}`)}
            />
            <p>
              <span
                className="font-semibold cursor-pointer mr-1"
                onClick={() => navigate(`/user/${c.user._id}`)}>
                {c.user.username}
              </span>
              {c.text}
            </p>
          </div>
        ))}
      </div>

      {/* HIDE COMMENTS */}
      {showAllComments && post.comments.length > 2 && (
        <button
          onClick={() => setShowAllComments(false)}
          className="text-sm text-gray-500 mt-1">
          Hide comments
        </button>
      )}

      {/* TIME */}
      <p className="text-xs text-gray-400 mt-1">
        {formatTime(post.createdAt)} ago
      </p>

      {/* ADD COMMENT */}
      <form onSubmit={handleComment} className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 border p-1 rounded text-sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className="text-blue-500 text-sm">
          Post
        </button>
      </form>
    </div>
  );
}
