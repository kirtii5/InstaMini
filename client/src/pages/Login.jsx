import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data._id);
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white border border-gray-300 w-[350px] py-8 px-10">
        <h1 className="text-4xl font-serif text-center mb-8">InstaMini</h1>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full text-sm px-3 py-2 border border-gray-300 bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full text-sm px-3 py-2 border border-gray-300 bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full mt-2 bg-[#0095f6] text-white font-semibold py-1.5 rounded hover:bg-[#1877f2]">
            Log In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-4 text-xs text-gray-400 font-semibold">OR</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <p className="text-center text-sm text-blue-800 font-medium cursor-pointer">
          Forgot password?
        </p>
      </div>

      <div className="bg-white border border-gray-300 w-[350px] py-4 mt-3 text-center text-sm">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-[#0095f6] font-semibold">
          Sign up
        </Link>
      </div>
    </div>
  );
}
