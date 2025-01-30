import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

export const AddPoints = () => {
  const handleWhatsAppRedirect = () => {
    // Replace with your actual WhatsApp contact number
    window.location.href = "https://wa.me/1234567890";
  };

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-dark-secondary rounded-lg p-6 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Add Points</h2>
          <p className="text-gray-400 mb-8">
            Contact us on WhatsApp to add points to your account. Our team will assist you with the process.
          </p>
          <Button
            className="bg-[#25D366] hover:bg-[#128C7E] text-white"
            onClick={handleWhatsAppRedirect}
          >
            Contact us on WhatsApp
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AddPoints;