
import { ArrowLeft, Gift, ListChecks, FileText, User, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const menuItems = [
    {
      title: "Paramètres du compte",
      items: [
        { icon: Gift, label: "Carte Cadeau / Code Promo", path: "/gift" },
        { icon: ListChecks, label: "Réservations", path: "/reservations" },
        { icon: FileText, label: "Facturations", path: "/billing" },
      ],
    },
    {
      title: "Paramètres de l'app",
      items: [
        { icon: User, label: "Mon compte", path: "/profile" },
        { icon: Bell, label: "Notifications", path: "/notifications" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <div className="p-4 flex items-center space-x-4 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-white">Menu</h1>
      </div>

      <div className="p-4 space-y-8">
        {menuItems.map((section) => (
          <div key={section.title} className="space-y-4">
            <h2 className="text-lg font-semibold text-white">{section.title}</h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="w-full p-4 flex items-center justify-between text-gray-300 hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-20 left-0 right-0 p-4">
        <button
          onClick={handleLogout}
          className="w-full p-4 text-center text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          Déconnexion
        </button>
        <div className="mt-4 text-center text-gray-500">
          Version: 3.24.0
        </div>
      </div>
    </div>
  );
};

export default Menu;
