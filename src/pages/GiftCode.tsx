
import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Type for the response from redeem_gift_code function
type RedeemGiftCodeResponse = {
  success: boolean;
  points_awarded?: number;
  message?: string;
};

const GiftCode = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .rpc('redeem_gift_code', { code_text: code });

      if (error) {
        // Check specifically for the unique constraint violation
        if (error.message.includes("gift_code_redemptions_code_id_user_id_key")) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "You have already redeemed this code",
          });
          return;
        }
        throw error;
      }

      // Cast the response to our expected type
      const response = data as RedeemGiftCodeResponse;

      if (response.success) {
        toast({
          title: "Success!",
          description: `You received ${response.points_awarded} points!`,
        });
        setCode("");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message || "Failed to redeem code",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to redeem code. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Redeeming..." : "Redeem Code"}
            </Button>
          </form>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default GiftCode;
