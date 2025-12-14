import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import PostCard from "../components/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await api.get("/feed");
        setPosts(res.data);
      } catch (error) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [navigate]);

  const refreshFeed = async () => {
    const res = await api.get("/feed");
    setPosts(res.data);
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading feed...</p>;
  }

  return (
    <main className="max-w-xl mt-5 mx-auto px-4 space-y-6">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">
          Search your friends to follow and see their posts.
        </p>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} refreshFeed={refreshFeed} />
        ))
      )}
    </main>
  );
}
