import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import FollowList from "./pages/FollowList";
import UserProfile from "./pages/UserProfile";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Feed />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Profile />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <CreatePost />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <UserProfile />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Search />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id/followers"
          element={<FollowList type="followers" />}
        />
        <Route
          path="/user/:id/following"
          element={<FollowList type="following" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
