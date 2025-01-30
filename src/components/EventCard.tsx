import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  imageUrl: string;
  onAttend: () => void;
}

export const EventCard = ({
  title,
  date,
  location,
  attendees,
  maxAttendees,
  imageUrl,
  onAttend,
}: EventCardProps) => {
  return (
    <Card className="overflow-hidden bg-dark-secondary border-gray-800 hover:border-accent transition-all duration-300">
      <div className="aspect-video relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-secondary to-transparent h-20" />
      </div>
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
            <UsersIcon className="w-4 h-4" />
            <span>{attendees}/{maxAttendees} attending</span>
          </div>
        </div>
        <Button 
          className="w-full bg-accent hover:bg-accent-hover text-white"
          onClick={onAttend}
        >
          Attend Event
        </Button>
      </div>
    </Card>
  );
};