
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { QRCodeSVG } from "qrcode.react";

const QRCode = () => {
  const { data: registration } = useQuery({
    queryKey: ["latest-registration"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("event_registrations")
        .select("qr_code")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-dark pb-16">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="bg-dark-secondary border-gray-800 p-6">
          <h2 className="text-xl font-bold text-white mb-6 text-center">My QR Code</h2>
          <div className="flex justify-center">
            {registration?.qr_code ? (
              <QRCodeSVG value={registration.qr_code} size={200} />
            ) : (
              <p className="text-gray-400 text-center">
                Register for an event to get your QR code
              </p>
            )}
          </div>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
};

export default QRCode;
