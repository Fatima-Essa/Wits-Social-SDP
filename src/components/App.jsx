import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// pages

import "react-lazy-load-image-component/src/effects/blur.css";
import Explore from "../pages/Explore";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Post from "../pages/Post";
import Reels from "../pages/Reels";
import ResetPassword from "../pages/ResetPassword";
import SavedPosts from "../pages/SavedPosts";
import Settings from "../pages/Settings";
import Following from "../pages/Following";
import Followers from "../pages/Followers";

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

//this component allows us to switch context from one page to another : Note all routes must be stated below !
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/explore"
            element={
              <RequireAuth>
                <Explore />
              </RequireAuth>
            }
          />
          <Route
            path="/reels"
            element={
              <RequireAuth>
                <Reels />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/p/:id" element={<Post />} />
          <Route path="/:username" element={<Profile />} />
            <Route path="/:username/saved" element={<SavedPosts />} />
          <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/Following" element={<Following />} />
            <Route path="/Followers" element={<Followers />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
