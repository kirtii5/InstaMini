import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  AiOutlineArrowLeft,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";

const DEFAULT_AVATAR =
  "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg";

export default function Search() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState([]);

  /* 🔁 Load recent searches */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecent(stored);
  }, []);

  /* 💾 Save recent searches */
  const saveRecent = (user) => {
    const updated = [user, ...recent.filter((u) => u._id !== user._id)].slice(
      0,
      8
    );

    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  /* ❌ Remove one recent */
  const removeRecent = (id) => {
    const updated = recent.filter((u) => u._id !== id);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  /* 🧹 Clear all */
  const clearAll = () => {
    setRecent([]);
    localStorage.removeItem("recentSearches");
  };

  /* 🔍 Search */
  const handleSearch = async (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await api.get(`/users/search?query=${value}`);
      setResults(res.data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 pb-20">
      {/* 🔝 HEADER */}
      <div className="flex items-center gap-3 h-14">
        <button onClick={() => navigate(-1)} className="text-xl">
          <AiOutlineArrowLeft />
        </button>

        <div className="relative flex-1">
          <AiOutlineSearch className="absolute left-3 top-2.5 text-gray-400" />

          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
            className="w-full bg-gray-100 rounded pl-10 pr-9 py-2 text-sm focus:outline-none"
          />

          {query && (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="absolute right-3 top-2.5 text-gray-400">
              <AiOutlineClose />
            </button>
          )}
        </div>
      </div>

      {/* 🔍 SEARCH RESULTS */}
      {query && (
        <div className="mt-2">
          {loading && (
            <p className="text-sm text-gray-400 mt-4 text-center">
              Searching...
            </p>
          )}

          {results.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                saveRecent(user);
                navigate(`/user/${user._id}`);
              }}
              className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
              <img
                src={user.profileImage || DEFAULT_AVATAR}
                className="w-9 h-9 rounded-full object-cover"
                alt="avatar"
              />
              <span className="text-sm font-medium">{user.username}</span>
            </div>
          ))}

          {!loading && results.length === 0 && (
            <p className="text-sm text-gray-400 mt-6 text-center">
              No results found
            </p>
          )}
        </div>
      )}

      {/* 🕘 RECENT SEARCHES */}
      {!query && recent.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Recent</span>
            <button onClick={clearAll} className="text-sm text-blue-500">
              Clear all
            </button>
          </div>

          {recent.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between px-2 py-2 hover:bg-gray-100 rounded">
              <div
                onClick={() => navigate(`/user/${user._id}`)}
                className="flex items-center gap-3 cursor-pointer">
                <img
                  src={user.profileImage || DEFAULT_AVATAR}
                  className="w-9 h-9 rounded-full object-cover"
                  alt="avatar"
                />
                <span className="text-sm">{user.username}</span>
              </div>

              <button
                onClick={() => removeRecent(user._id)}
                className="text-gray-400">
                <AiOutlineClose />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
