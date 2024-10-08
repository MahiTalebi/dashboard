import { RouterProvider } from "react-router-dom";
import "./App.css";
import "./core/i18n";

import { Login } from "./features/identity/components/Login/Login";
import { Register } from "./features/identity/components/Register/Register";
import { router } from "./router";

function App() {
  return (
    <div className="font-iranyekan">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
