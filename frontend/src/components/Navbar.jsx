import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { LogOut, MessageSquare, User, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header
      className="fixed top-0 z-40 w-full border-b border-base-300
      bg-base-100/80 backdrop-blur-lg"
    >
      <div className="container mx-auto h-16 px-4">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 transition-all hover:opacity-80"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <MessageSquare className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-lg font-bold">ChatNova</h1>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="btn btn-sm gap-2 transition-all"
            >
              {theme === "light" ? (
                <>
                  <Moon className="h-5 w-5" />
                </>
              ) : (
                <>
                  <Sun className="h-5 w-5" />
                </>
              )}
            </button>

            {authUser && (
              <>
                {/* Profile */}
                <Link to="/profile" className="btn btn-sm gap-2">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm">Account</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={logout}
                  aria-label="Logout"
                  className="relative flex items-center gap-2 group"
                >
                  <span
                    className="absolute inset-0 scale-0 rounded-full bg-white/70
                    blur-lg opacity-0 transition-all duration-300
                    group-hover:scale-100 group-hover:opacity-100"
                  />
                  <LogOut className="relative z-10 h-6 w-6 transition group-hover:text-error" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
