import { useNavigate, useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlinePlusSquare,
  AiOutlineUser,
} from "react-icons/ai";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const active = (path) =>
    location.pathname === path ? "text-black" : "text-gray-400";

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="max-w-5xl mx-auto px-8 h-14 flex items-center justify-between text-2xl">
        <button onClick={() => navigate("/feed")} className={active("/feed")}>
          <AiOutlineHome />
        </button>

        <button
          onClick={() => navigate("/search")}
          className={active("/search")}>
          <AiOutlineSearch />
        </button>

        <button
          onClick={() => navigate("/create")}
          className={active("/create")}>
          <AiOutlinePlusSquare />
        </button>

        <button
          onClick={() => navigate("/profile")}
          className={active("/profile")}>
          <AiOutlineUser />
        </button>
      </div>
    </footer>
  );
}
