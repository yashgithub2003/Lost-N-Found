import { useAuth } from "@/context/AuthContext";
import {
  History,
  Home,
  LogOut,
  MessageCircle,
  PackageCheck,
  PlusSquare,
  Search,
  TrendingUp,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LeftSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const middleItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <PackageCheck />, text: "Found" },
    { icon: <History />, text: "History" },

    { icon: <User />, text: "Profile" },
  ];

  const bottomItem = { icon: <LogOut />, text: "Logout" };

  const sidebarHandler = (text) => {
    if (text === "Create"){
       setOpen(true);
    }
    else if (text === "Logout"){
      navigate('/login')
      setUser(null)
    }else if (text === "History"){
      navigate('/history')
    }else if (text === "Home"){
      navigate('/')
    }else if (text === "Search"){
      navigate('/search')
    }else if (text === "Found"){
      navigate('/found')
    }
     
  };

  return (
    <div className="fixed  top-0 left-0 z-10 px-4 border-double bg-[#111827] text-[#e5e7eb] border-[#374151] w-[16%] h-screen flex flex-col">
      {/* 🔝 Logo */}
      <h1 className="my-8 pl-3 font-bold text-xl">LOGO</h1>

      {/* 🟰 Center items */}
      <div className="flex flex-col justify-center flex-1">
        {middleItems.map((item, index) => (
          <div
            key={index}
            onClick={() => sidebarHandler(item.text)}
            className="flex items-center gap-3 hover:bg-gray-700 cursor-pointer rounded-lg p-3 my-3"
          >
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
        <h1>Welcome back,<br/>{user?.email}</h1>
      {/* 🔻 Bottom */}
      <div
        onClick={() => sidebarHandler(bottomItem.text)}
        className="flex items-center gap-3 hover:bg-gray-700 cursor-pointer rounded-lg p-3 my-3 mb-5"
      >
        {bottomItem.icon}
        <span>{bottomItem.text}</span>
      </div>
    </div>
  );
};

export default LeftSidebar;
