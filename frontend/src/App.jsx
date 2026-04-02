import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./components/Home";
import Login from "./components/Login";
import { Signup } from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import History from "./components/History";
import Search from "./components/Search";
import Found from "./components/Found";
import Item from "./components/Item";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/found",
        element: <Found />,
      },
      {
        path: "/item/:id",
        element: <Item />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const App = () => {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={browserRouter} />
      </AuthProvider>
    </div>
  );
};

export default App;
