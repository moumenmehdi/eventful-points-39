
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard } from "@/components/EventCard";
import { format } from "date-fns";

type Event = {
  id: string;
  title: string;
  instructor: string;
  date: string;
  duration: number;
  location: string;
  max_capacity: number;
  description: string;
};

export const EventList = () => {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });

  const { data: registrations } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("event_registrations")
        .select("event_id")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
      return data;
    },
  });

  const registeredEventIds = registrations?.map((reg) => reg.event_id) || [];

  if (isLoading) {
    return <div className="text-white">Loading events...</div>;
  }

  const upcomingEvents = events?.filter(
    (event) => new Date(event.date) > new Date()
  );
  const registeredEvents = events?.filter((event) =>
    registeredEventIds.includes(event.id)
  );

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList className="w-full bg-dark-secondary mb-6">
        <TabsTrigger
          value="upcoming"
          className="flex-1 data-[state=active]:bg-accent"
          onClick={() => setSelectedTab("upcoming")}
        >
          Upcoming Events
        </TabsTrigger>
        <TabsTrigger
          value="registered"
          className="flex-1 data-[state=active]:bg-accent"
          onClick={() => setSelectedTab("registered")}
        >
          My Events
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="m-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents?.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={format(new Date(event.date), "MMM d @ h:mm a")}
              location={event.location}
              instructor={event.instructor}
              description={event.description || ""}
              isRegistered={registeredEventIds.includes(event.id)}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="registered" className="m-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registeredEvents?.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={format(new Date(event.date), "MMM d @ h:mm a")}
              location={event.location}
              instructor={event.instructor}
              description={event.description || ""}
              isRegistered={true}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
