import { Header } from "@/components/Header";
import { EventCard } from "@/components/EventCard";

const MOCK_EVENTS = [
  {
    id: 1,
    title: "International Friends in Rabat",
    date: "Feb 11 @ 8 PM UTC+1",
    location: "Le Limonadier, Rabat",
    attendees: 12,
    maxAttendees: 50,
    imageUrl: "/lovable-uploads/52c80895-4b46-42df-8791-e26617e55f1f.png",
  },
  {
    id: 2,
    title: "Moroccan Magic: Casablanca to Marrakech",
    date: "Feb 5 @ 2 PM UTC+1",
    location: "Marrakech",
    attendees: 19,
    maxAttendees: 30,
    imageUrl: "/lovable-uploads/bb74fa61-4b15-4a0d-8edf-9ec55110fc95.png",
  },
];

const Index = () => {
  const handleAttend = (eventId: number) => {
    console.log("Attending event:", eventId);
    // This will be implemented with the backend later
  };

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EVENTS.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              onAttend={() => handleAttend(event.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;