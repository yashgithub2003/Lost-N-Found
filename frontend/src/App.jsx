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
import ProtectedRoutes from "./components/ProtectedRoutes";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/history",
        element: (
          <ProtectedRoutes>
            <History />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/search",
        element: (
          <ProtectedRoutes>
            <Search />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/found",
        element: (
          <ProtectedRoutes>
            <Found />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/item/:id",
        element: (
          <ProtectedRoutes>
            <Item />
          </ProtectedRoutes>
        ),
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
