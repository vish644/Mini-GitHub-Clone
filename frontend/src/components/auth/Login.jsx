import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../authContext";

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // States
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("Login data:", data);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email: data.email,
        password: data.password,
      });

      console.log("Login response:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);

      navigate("/");
      toast.success("Login Successfully!");
    } catch (error) {
      console.log("Error", error);
      toast.error("Login failed. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <img
        src="https://github.com/images/modules/logos_page/GitHub-Mark.png"
        alt="GitHub Logo"
      />
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email  */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            maxLength={20}
          />
        </div>

        {/* Password  */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            maxLength={20}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <div>
        <p>
          New to GitHub?<Link to={"/signup"}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
