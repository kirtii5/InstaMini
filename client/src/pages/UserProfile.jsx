import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import PostCard from "../components/PostCard";
import { FiArrowLeft, FiLogOut, FiX } from "react-icons/fi";

const DEFAULT_AVATAR =
  "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 modal state
  const [activePost, setActivePost] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/users/${id}`);
      setProfile(res.data);
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleFollowToggle = async () => {
    try {
      if (profile.isFollowing) {
        await api.post(`/users/${id}/unfollow`);
      } else {
        await api.post(`/users/${id}/follow`);
      }
      fetchProfile();
    } catch {
      alert("Follow action failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading…</p>;
  }

  if (!profile) {
    return <p className="text-center mt-10 text-red-500">User not found</p>;
  }

  return (
    <>
      {/* 🔥 TOP BAR (MOBILE IG STYLE) */}
      <div className="sticky top-0 bg-white border-b z-40">
        <div className="max-w-xl mx-auto h-12 px-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)}>
            <FiArrowLeft size={20} />
          </button>

          <span className="font-semibold text-sm">{profile.username}</span>

          <button onClick={handleLogout}>
            <FiLogOut size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex items-center gap-6 py-6">
          {/* ✅ PERFECT CIRCLE */}
          <div className="w-[88px] aspect-square rounded-full overflow-hidden">
            <img
              src={profile.profileImage || DEFAULT_AVATAR}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold">{profile.username}</h2>

            <div className="flex gap-6 text-sm mt-3">
              <span>
                <strong>{profile.posts.length}</strong> posts
              </span>

              <button
                onClick={() => navigate(`/user/${profile._id}/followers`)}
                className="hover:underline">
                <strong>{profile.followersCount}</strong> followers
              </button>

              <button
                onClick={() => navigate(`/user/${profile._id}/following`)}
                className="hover:underline">
                <strong>{profile.followingCount}</strong> following
              </button>
            </div>

            {profile._id !== currentUserId && (
              <button
                onClick={handleFollowToggle}
                className={`mt-4 px-6 py-1.5 rounded text-sm font-medium ${
                  profile.isFollowing
                    ? "border border-gray-400 text-gray-700"
                    : "bg-blue-500 text-white"
                }`}>
                {profile.isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>

        {/* POSTS GRID */}
        {profile.posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No posts yet</p>
        ) : (
          <div className="grid grid-cols-3 gap-[2px]">
            {profile.posts.map((post) => (
              <div
                key={post._id}
                onClick={() => setActivePost(post)} // 🔥 modal open
                className="aspect-square cursor-pointer">
                <img
                  src={post.imageUrl}
                  alt="post"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔥 POST MODAL (NO NEW PAGE) */}
      {activePost && (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center overflow-y-auto">
          <div className="w-full max-w-xl bg-white min-h-screen relative">
            {/* CLOSE */}
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-3 right-3 z-50">
              <FiX size={22} />
            </button>

            <PostCard post={activePost} refreshFeed={fetchProfile} />
          </div>
        </div>
      )}
    </>
  );
}
