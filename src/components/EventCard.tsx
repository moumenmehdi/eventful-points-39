
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  instructor: string;
  description: string;
  isRegistered: boolean;
}

export const EventCard = ({
  id,
  title,
  date,
  location,
  instructor,
  description,
  isRegistered,
}: EventCardProps) => {
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const { toast } = useToast();

  const handleRegister = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error, data } = await supabase
        .from("event_registrations")
        .insert([
          {
            event_id: id,
            user_id: user.id,
          },
        ])
        .select("qr_code")
        .single();

      if (error) throw error;

      setQrCode(data.qr_code);
      toast({
        title: "Success!",
        description: "You have successfully registered for this event.",
      });
      setShowQR(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to register for the event.",
      });
    }
  };

  const handleShowQR = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("event_registrations")
        .select("qr_code")
        .eq("event_id", id)
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      setQrCode(data.qr_code);
      setShowQR(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to retrieve QR code.",
      });
    }
  };

  return (
    <>
      <Card className="overflow-hidden bg-dark-secondary border-gray-800 hover:border-accent transition-all duration-300">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-gray-400">
              <CalendarIcon className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPinIcon className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <UserIcon className="w-4 h-4" />
              <span>{instructor}</span>
            </div>
          </div>
          <Button
            className="w-full bg-accent hover:bg-accent-hover text-white"
            onClick={isRegistered ? handleShowQR : handleRegister}
          >
            {isRegistered ? "Show QR Code" : "Register"}
          </Button>
        </div>
      </Card>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Event QR Code</DialogTitle>
            <DialogDescription>
              Show this QR code to the instructor when you arrive at the event.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center p-4">
            {qrCode && <QRCodeSVG value={qrCode} size={200} />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
