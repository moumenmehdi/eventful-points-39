import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Gift, Code } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ManageCodes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const { data: codes, refetch } = useQuery({
    queryKey: ["gift-codes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gift_codes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const codeData = {
        code: formData.get("code") as string,
        points: parseInt(formData.get("points") as string),
        max_uses: parseInt(formData.get("max_uses") as string),
        max_uses_per_user: parseInt(formData.get("max_uses_per_user") as string),
        expires_at: formData.get("expires_at") as string,
        created_by: user.id,
      };

      const { error } = await supabase.from("gift_codes").insert([codeData]);
      
      if (error) throw error;

      toast({
        title: "Success",
        description: "Gift code created successfully",
      });
      setIsOpen(false);
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create gift code",
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark pb-16">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Manage Gift Codes</h1>
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-accent hover:bg-accent/90"
          >
            <Gift className="w-4 h-4 mr-2" />
            Generate Code
          </Button>
        </div>

        <div className="space-y-4">
          {codes?.map((code) => (
            <div
              key={code.id}
              className="bg-dark-secondary p-4 rounded-lg border border-gray-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-accent" />
                    <h3 className="text-lg font-semibold text-white">
                      {code.code}
                    </h3>
                  </div>
                  <p className="text-gray-400">{code.points} points</p>
                  <p className="text-sm text-gray-500">
                    Expires: {new Date(code.expires_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    Max uses: {code.max_uses}
                  </p>
                  <p className="text-sm text-gray-400">
                    Per user: {code.max_uses_per_user}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate New Gift Code</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="code"
                placeholder="Code (e.g., SUMMER2024)"
                required
              />
              <Input
                type="number"
                name="points"
                placeholder="Points"
                required
              />
              <Input
                type="number"
                name="max_uses"
                placeholder="Maximum Total Uses"
                required
              />
              <Input
                type="number"
                name="max_uses_per_user"
                placeholder="Maximum Uses Per User"
                required
              />
              <Input
                type="datetime-local"
                name="expires_at"
                required
              />
              <Button type="submit" className="w-full">
                Generate Code
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>
      <BottomNav />
    </div>
  );
};

export default ManageCodes;