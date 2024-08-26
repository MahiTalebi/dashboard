import { createBrowserRouter } from "react-router-dom";
import { Login } from "./features/identity/components/Login/Login";
import { Register } from "./features/identity/components/Login/Register";
import { IdentityLayout } from "./layouts/identity-layout";
import { registerAction } from "./features/identity/components/Login/Register";

export const router = createBrowserRouter([
  {
    element: <IdentityLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "login", element: <Login /> },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        errorElement: <Register />,
      },
    ],
  },
]);
