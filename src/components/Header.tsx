
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const points = 100; // This will be dynamic with Supabase

  return (
    <header className="bg-dark-secondary border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">EventLmla7</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Points:</span>
            <span className="text-accent font-bold">{points}</span>
          </div>
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => navigate("/menu")}
            className="text-white hover:text-accent"
          >
            <MenuIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};
