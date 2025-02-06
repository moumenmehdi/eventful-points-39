import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

export const AddPoints = () => {
  const handleWhatsAppRedirect = (points: number, amount: number) => {
    const message = `Hello, I would like to buy ${points} points for ${amount} MAD`;
    window.location.href = `https://wa.me/212778802262?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <main className="container mx-auto px-4 py-8 pb-20">
        <div className="max-w-2xl mx-auto bg-dark-secondary rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Add Points</h2>
          <div className="grid gap-4 mb-8">
            <div className="border border-accent rounded-lg p-4">
              <h3 className="text-xl text-white font-semibold mb-2">100 Points</h3>
              <p className="text-gray-400 mb-4">100 MAD</p>
              <Button 
                className="bg-accent hover:bg-accent/90 text-white"
                onClick={() => handleWhatsAppRedirect(100, 100)}
              >
                Buy Now
              </Button>
            </div>
            <div className="border border-accent rounded-lg p-4">
              <h3 className="text-xl text-white font-semibold mb-2">250 Points</h3>
              <p className="text-gray-400 mb-4">250 MAD</p>
              <Button 
                className="bg-accent hover:bg-accent/90 text-white"
                onClick={() => handleWhatsAppRedirect(250, 250)}
              >
                Buy Now
              </Button>
            </div>
            <div className="border border-accent rounded-lg p-4">
              <h3 className="text-xl text-white font-semibold mb-2">500 Points</h3>
              <p className="text-gray-400 mb-4">500 MAD</p>
              <Button 
                className="bg-accent hover:bg-accent/90 text-white"
                onClick={() => handleWhatsAppRedirect(500, 500)}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default AddPoints;