import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import PostCard from "../components/PostCard";
import { FiLogOut, FiX } from "react-icons/fi";

const DEFAULT_AVATAR =
  "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg";

export default function Profile() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchProfile = async () => {
    const res = await api.get("/users/me");
    setProfile(res.data);
  };

  useEffect(() => {
    fetchProfile().finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const uploadProfileImage = async (file) => {
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    await api.put("/users/me/profile-image", fd);
    setShowOptions(false);
    fetchProfile();
  };

  const removeProfileImage = async () => {
    const fd = new FormData();
    fd.append("remove", "true");
    await api.put("/users/me/profile-image", fd);
    setShowOptions(false);
    fetchProfile();
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <>
      {/* TOP BAR */}
      <div className="sticky top-0 bg-white border-b z-40">
        <div className="max-w-xl mx-auto h-12 px-4 flex items-center justify-between">
          <span className="font-semibold text-sm">{profile.username}</span>
          <button onClick={handleLogout}>
            <FiLogOut size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4">
        {/* PROFILE HEADER */}
        <div className="flex items-center gap-6 py-6">
          <div
            onClick={() => setShowOptions(true)}
            className="w-[88px] aspect-square rounded-full overflow-hidden cursor-pointer">
            <img
              src={profile.profileImage || DEFAULT_AVATAR}
              className="w-full h-full object-cover"
              alt="profile"
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

            <button
              onClick={() => navigate("/create")}
              className="mt-4 border px-4 py-1.5 text-sm rounded">
              Create Post
            </button>
          </div>
        </div>

        {/* POSTS GRID */}
        {profile.posts.length === 0 ? (
          <div className="text-center mt-24">
            <div className="mx-auto mb-6 w-16 h-16 border-2 border-black rounded-full flex items-center justify-center">
              📷
            </div>
            <h3 className="text-xl font-light mb-2">Create your first post</h3>
            <p className="text-gray-500 mb-4">Share your point of view.</p>
            <button
              onClick={() => navigate("/create")}
              className="text-blue-500 font-semibold">
              Create
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-[2px]">
            {profile.posts.map((post) => (
              <div
                key={post._id}
                onClick={() => setSelectedPost(post)}
                className="aspect-square cursor-pointer">
                <img
                  src={post.imageUrl}
                  className="w-full h-full object-cover"
                  alt="post"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* POST MODAL (INSTAGRAM STYLE) */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-xl">
            {/* ❌ CLOSE – MOVED ABOVE CARD */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute -top-10 right-2 text-white">
              <FiX size={26} />
            </button>

            {/* POST CARD */}
            <div className="bg-white rounded">
              <PostCard post={selectedPost} refreshFeed={fetchProfile} />
            </div>
          </div>
        </div>
      )}

      {/* PROFILE IMAGE OPTIONS */}
      {showOptions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded w-72 text-sm overflow-hidden">
            <button
              onClick={() => fileRef.current.click()}
              className="w-full py-3 border-b hover:bg-gray-100">
              Upload new photo
            </button>
            <button
              onClick={removeProfileImage}
              className="w-full py-3 text-red-500 border-b hover:bg-gray-100">
              Remove photo
            </button>
            <button
              onClick={() => setShowOptions(false)}
              className="w-full py-3 hover:bg-gray-100">
              Cancel
            </button>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => uploadProfileImage(e.target.files[0])}
          />
        </div>
      )}
    </>
  );
}
