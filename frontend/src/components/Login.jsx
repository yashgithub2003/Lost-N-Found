import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/services/apiService";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useAuth();

  const eventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(input);

      if (res.data.success) {
        setUser(res.data.user);
        toast.success(res.data.message);
        navigate("/");
        setInput({ email: "", password: "" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-[#111827] h-screen w-screen  text-slate-300 flex items-center justify-center">
      <div className="bg-[#0c101a] h-[60%] w-[35%] bg- rounded-[10%] flex flex-col justify-center items-center gap-6">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-slate-600">LOGO</h1>

        {/* Form */}
        <form onSubmit={loginHandler} className="flex flex-col gap-4 w-[70%]">
          <input
            type="email"
            placeholder="Enter your Mail ID"
            name="email"
            value={input.email}
            onChange={eventHandler}
            className="p-2 rounded border bg-[#aab9cd] placeholder-black border-gray-300"
          />

          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={input.password}
            onChange={eventHandler}
            className="p-2 rounded border bg-[#aab9cd] placeholder-black border-gray-300"
          />

          <button type="submit" className="bg-[#546476] text-white p-2 rounded">
            Login
          </button>
          <span className="text-center">
            Not have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
