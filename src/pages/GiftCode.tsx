import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const GiftCode = () => {
  const [code, setCode] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement gift code validation with Supabase
    toast({
      title: "Not implemented",
      description: "Gift code redemption will be implemented soon.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <main className="container mx-auto px-4 py-8 pb-20">
        <div className="max-w-mlg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Redeem Gift Code
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter your gift code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-dark border-gray-700 text-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white"
            >
              Redeem Code
            </Button>
          </form>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default GiftCode;