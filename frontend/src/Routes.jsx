import React, { use, useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

// Pages
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Profile from "./components/user/Profile";
import Signup from "./components/auth/Signup";

// AuthContext
import { useAuth } from "./components/authContext";

const ProjectProutes = () => {
  const {currentUser, setCurrentUser} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage && !currentUser) {
      // Set the current user based on the stored user ID
      setCurrentUser(userIdFromStorage);
    }

    if (
      !userIdFromStorage &&
      !["/auth", "/signup"].includes(window.location.pathname)
    ) {
      // If no user ID is found in localStorage, navigate to the login page
      navigate("/auth");
    }

    if (
      userIdFromStorage &&
      ["/auth", "/signup"].includes(window.location.pathname)
    ) {
      // If user is already logged in and tries to access auth or signup page, redirect to dashboard
      navigate("/dashboard");
    }
  }, [currentUser, navigate, setCurrentUser]);

  let routes = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return routes;
};

export default ProjectProutes;