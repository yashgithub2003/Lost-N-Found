import { signupUser } from "@/services/apiService";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Signup = () => {
  const [input, setInput] = useState({
    name:"",
    email:"",
    password:""
  });
  const navigate = useNavigate();

  const eventHandler = (e) =>{
    setInput({...input,[e.target.name]:e.target.value})
  }
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await signupUser(input);
      if (res.data.success){
        toast.success(res.data.message);
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="bg-[#111827] h-screen w-screen  text-slate-300 flex items-center justify-center">
      <div className="bg-[#0c101a] h-[60%] w-[35%] bg- rounded-[10%] flex flex-col justify-center items-center gap-6">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-slate-600">LOGO</h1>

        {/* Form */}
        <form onSubmit={signupHandler} className="flex flex-col gap-4 w-[70%]">
          <input
            type="text"
            placeholder="Enter your Name"
            name="name"
            value={input.name}
            onChange={eventHandler}
            className="p-2 rounded border bg-[#aab9cd] placeholder-black border-gray-300"
          />
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
            Signup
          </button>
          <span className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
export default Signup;
