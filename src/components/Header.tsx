import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const points = 100; // This will be dynamic later

  return (
    <header className="bg-dark-secondary border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-white">EventPoint</h1>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Points:</span>
            <span className="text-accent font-bold">{points}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-white"
            onClick={() => navigate("/add-points")}
          >
            Add Points
          </Button>
          <Button 
            variant="ghost"
            className="text-white hover:text-accent"
            onClick={() => navigate("/profile")}
          >
            Profile
          </Button>
        </div>
      </div>
    </header>
  );
};