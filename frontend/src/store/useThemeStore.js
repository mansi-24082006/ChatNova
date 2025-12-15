import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
  // Safe initial theme
  theme: "dark",

  // Initialize theme (call once on app load)
  initTheme: () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    set({ theme: savedTheme });
  },

  // Toggle light / dark
  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";

    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    set({ theme: newTheme });
  },
}));
