import { createBrowserRouter } from "react-router-dom";
import { Login, loginAction } from "./features/identity/components/Login/Login";
import {
  Register,
  registerAction,
} from "./features/identity/components/Register/Register";
import { IdentityLayout } from "./layouts/IdentityLayout";
import { MainLayout } from "./layouts/MainLayout";
import { Courses } from "./pages/Courses";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: "/", element: <Courses />, index: true }],
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
        errorElement: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
        errorElement: <Register />,
      },
    ],
  },
]);
