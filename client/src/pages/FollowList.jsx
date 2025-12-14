import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { FiArrowLeft } from "react-icons/fi";

const DEFAULT_AVATAR =
  "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg";

export default function FollowList({ type }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get(`/users/${id}/${type}`).then((res) => setUsers(res.data));
  }, [id, type]);

  const toggleFollow = async (userId, isFollowing) => {
    await api.post(`/users/${userId}/${isFollowing ? "unfollow" : "follow"}`);
    setUsers((prev) =>
      prev.map((u) =>
        u._id === userId ? { ...u, isFollowing: !isFollowing } : u
      )
    );
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="sticky top-0 bg-white border-b z-50">
        <div className="max-w-md mx-auto h-12 px-4 flex items-center">
          <button onClick={() => navigate(-1)}>
            <FiArrowLeft size={20} />
          </button>
          <span className="ml-4 font-semibold capitalize">{type}</span>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4">
        {users.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No {type} yet</p>
        )}

        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between py-3">
            <div
              onClick={() => navigate(`/user/${user._id}`)}
              className="flex items-center gap-3 cursor-pointer">
              <img
                src={user.profileImage || DEFAULT_AVATAR}
                className="w-10 h-10 rounded-full object-cover"
                alt="avatar"
              />
              <span className="text-sm font-medium">{user.username}</span>
            </div>

            <button
              onClick={() => toggleFollow(user._id, user.isFollowing)}
              className={`text-sm px-4 py-1 rounded border ${
                user.isFollowing
                  ? "border-gray-400"
                  : "border-blue-500 text-blue-600"
              }`}>
              {user.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
