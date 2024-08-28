import { Outlet } from "react-router-dom";
import { ChangeLanguage } from "../components/ChangeLanguage";
import { DarkSwitcher } from "../components/DarkSwitcher";

export function IdentityLayout() {
  return (
    <div className="flex flex-col justify-center bg-slate-100 dark:bg-slate-800 h-screen">
      <nav className="border-b-2 dark:border-b-slate-700 w-full fixed top-0 flex px-5">
        <DarkSwitcher />
        <ChangeLanguage />
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
