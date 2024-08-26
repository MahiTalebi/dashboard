import faFlag from "@assets/images/fa.png";
import enFlag from "@assets/images/us.png";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../contexts/app/AppContext";

export function ChangeLanguage() {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const { language, changeLanguage } = useAppContext();

  useEffect(() => {
    const checkClose = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", checkClose);
    return () => {
      document.addEventListener("mousedown", checkClose);
    };
  }, [open]);
  return (
    <div className="relative m-3">
      <div className=" ">
        <a className="" onClick={() => setOpen(true)}>
          <img
            className="w-10 h-10 rounded-full"
            src={language === "fa" ? faFlag : enFlag}
          />
        </a>
        <div
          ref={ref}
          className={`flex-col absolute m-2 shadow-md bg-white z-10 w-32 h-20 rounded border-2 items-center justify-center ${
            open ? "flex" : "hidden"
          }`}
        >
          <a
            className="w-full flex justify-center gap-6 hover:bg-blue-400 py-2"
            onClick={() => changeLanguage("fa")}
          >
            <img src={faFlag} className="rounded-full w-5 h-5" />
            <span className="mous">فارسی</span>
          </a>
          <a
            className="w-full flex justify-center gap-3 hover:bg-blue-400 py-2"
            onClick={() => changeLanguage("en")}
          >
            <img src={enFlag} className="rounded-full w-5 h-5" />
            <span className="mous">English</span>
          </a>
        </div>
      </div>
    </div>
  );
}
