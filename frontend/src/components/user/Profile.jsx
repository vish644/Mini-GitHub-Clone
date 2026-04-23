import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authContext";

const Profile = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  const [userDetails, setUserDetails] = useState("username");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        try {
          const res = await axios.get(
            `http://localhost:3000/userProfile/${userId}`,
          );
          setUserDetails(res.data || []);
        } catch (error) {
          console.error("Cannot fetch user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);

    window.location.href = "/auth";
  };

  return (
    <div>
      Profile Page
      <Link>
        <button onClick={handleLogOut}>Logout</button>
      </Link>
    </div>
  );
};

export default Profile;
