import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function ProtectedLayout({ children }) {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/search" ||
    location.pathname === "/profile" ||
    location.pathname.startsWith("/user/");

  return (
    <div className="flex">
      {/* DESKTOP SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-64">
        {/* MOBILE NAVBAR */}
        {!hideNavbar && (
          <div className="md:hidden">
            <Navbar />
          </div>
        )}

        {children}

        {/* MOBILE FOOTER */}
        <div className="md:hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
}
