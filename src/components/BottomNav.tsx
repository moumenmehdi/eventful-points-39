
import { HomeIcon, HeartIcon, UserIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-secondary border-t border-gray-800">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/"
          className={`flex flex-col items-center ${
            isActive("/") ? "text-accent" : "text-gray-400"
          }`}
        >
          <HomeIcon className="w-6 h-6 mb-1" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to="/registered"
          className={`flex flex-col items-center ${
            isActive("/registered") ? "text-accent" : "text-gray-400"
          }`}
        >
          <HeartIcon className="w-6 h-6 mb-1" />
          <span className="text-xs">My Events</span>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center ${
            isActive("/profile") ? "text-accent" : "text-gray-400"
          }`}
        >
          <UserIcon className="w-6 h-6 mb-1" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
};
