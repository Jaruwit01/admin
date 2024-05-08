import React from 'react'
import ReactDOM from 'react-dom/client'
import User from "./page/user.js";
import Post from "./page/post.js";
import Navbar from "./components/navbar.js";
import Dashboard from './page/dashboard.js';
import ResetPassword from './page/resetPassword.js';
import Login from './page/Login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/User",
    element: <User />
  },
  {
    path: "/Post",
    element: <Post />
  },
  {
    path: "/navbar",
    element: <Navbar />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/ResetPassword/:id",
    element: <ResetPassword />
  },
  {
    path: "/",
    element: <Login />
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);