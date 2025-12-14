import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiSearch,
  FiPlusSquare,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 border-r bg-white px-6 py-6 flex-col">
      {/* LOGO */}
      <div
        onClick={() => navigate("/feed")}
        className="flex items-center gap-2 mb-5 cursor-pointer">
        <img src="/image.png" alt="InstaMini" className="w-7 h-7" />
        <span className="text-lg font-semibold">InstaMini</span>
      </div>

      {/* NAV LINKS */}
      <nav className="flex flex-col gap-6 text-sm">
        <button
          onClick={() => navigate("/feed")}
          className="flex items-center gap-3 hover:text-blue-600">
          <FiHome size={18} /> Feed
        </button>

        <button
          onClick={() => navigate("/search")}
          className="flex items-center gap-3 hover:text-blue-600">
          <FiSearch size={18} /> Search
        </button>

        <button
          onClick={() => navigate("/create")}
          className="flex items-center gap-3 hover:text-blue-600">
          <FiPlusSquare size={18} /> Create
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 hover:text-blue-600">
          <FiUser size={18} /> Profile
        </button>
      </nav>

      {/* LOGOUT */}
      <div className="mt-auto">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-500 text-sm">
          <FiLogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
