import { Outlet } from "react-router-dom";
import { ChangeLanguage } from "../components/ChangeLanguage";

export function IdentityLayout() {
  return (
    <div className="flex flex-col justify-between bg-slate-100 h-screen">
      <nav className="border-b-2 h-16">
        <ChangeLanguage />
      </nav>
      <Outlet />
    </div>
  );
}
