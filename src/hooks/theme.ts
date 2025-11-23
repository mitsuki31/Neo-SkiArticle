import { useState, useEffect } from "react";

export function useTheme(): "dark" | "light" {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    const initial =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light";

    setTheme(initial);

    // Optional: Listen for manual theme changes (e.g., from ThemeToggle)
    const observer = new MutationObserver(() => {
      setTheme(root.classList.contains("dark") ? "dark" : "light");
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}
