import { useEffect, useState } from "react";

const themes = [
  "light",
  "dark",
  "emerald",
  "fantasy",
  "pastel",
  "lemonade",
  "aqua",
];

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme") || "emerald",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  };

  return (
    <button
      onClick={cycleTheme}
      className="btn btn-ghost btn-circle hover:scale-110 transition-transform duration-200"
      title={`Current theme: ${currentTheme}`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
        />
      </svg>
    </button>
  );
}
