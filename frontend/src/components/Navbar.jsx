import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-lg font-bold">ChatNova</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-6 h-6" />
              <span className="hidden sm:inline text-sm">Controls</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-3`}>
                  <User className="size-6" />
                  <span className="hidden sm:inline text-sm">Account Info</span>
                </Link>

                <button
                  className="flex gap-2 items-center relative group"
                  onClick={logout}
                >
                  {/* Spark effect */}
                  <span
                    className="absolute inset-0 scale-0 group-hover:scale-100 rounded-full 
                   bg-white/70 blur-lg opacity-0 group-hover:opacity-100 
                   transition-all duration-300"
                  ></span>

                  <LogOut className="size-6 relative z-10 group-hover:text-blue-500 transition" />
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
