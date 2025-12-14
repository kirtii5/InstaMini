import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data._id);

      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* MAIN CARD */}
      <div className="bg-white border border-gray-300 w-[350px] py-8 px-10">
        {/* LOGO */}
        <h1 className="text-4xl font-serif text-center mb-6">InstaMini</h1>

        <p className="text-center text-gray-500 text-sm mb-4">
          Sign up to see photos and videos from your friends.
        </p>

        {error && (
          <p className="text-red-500 text-xs text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email"
            placeholder="Email"
            className="w-full text-sm px-3 py-2 border border-gray-300 bg-gray-50 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Username"
            className="w-full text-sm px-3 py-2 border border-gray-300 bg-gray-50 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full text-sm px-3 py-2 border border-gray-300 bg-gray-50 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full mt-3 bg-[#0095f6] text-white font-semibold py-1.5 rounded hover:bg-[#1877f2]">
            Sign up
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          By signing up, you agree to our Terms, Privacy Policy and Cookies
          Policy.
        </p>
      </div>

      {/* LOGIN CARD */}
      <div className="bg-white border border-gray-300 w-[350px] py-4 mt-3 text-center text-sm">
        Have an account?{" "}
        <Link to="/" className="text-[#0095f6] font-semibold">
          Log in
        </Link>
      </div>
    </div>
  );
}
