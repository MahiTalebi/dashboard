import { useAppContext } from "../contexts/app/AppContext";
export function DarkSwitcher() {
  const { theme, changeTheme } = useAppContext();
  const changeThemeHandler = () => {
    changeTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={changeThemeHandler} className="text-yellow-500">
      <svg
        className="sun-and-moon"
        aria-hidden="true"
        width="40"
        height="40"
        viewBox="0 0 24 24"
      >
        <mask id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
          {theme === "dark" && (
            <circle cx="18" cy="12" r="6" fill="black"></circle>
          )}
        </mask>
        <circle
          className="sun"
          cx="12"
          cy="12"
          r="6"
          mask="url(#moon-mask)"
          fill="currentColor"
        ></circle>
        {theme !== "dark" && (
          <g className="sun-beams" stroke="currentColor">
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </g>
        )}
      </svg>
    </button>
  );
}
