
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard } from "@/components/EventCard";
import { format } from "date-fns";
import { Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Event = {
  id: string;
  title: string;
  instructor: string;
  date: string;
  duration: number;
  location: string;
  max_capacity: number;
  description: string;
  contact_phone?: string;
  contact_email?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
};

export const EventList = () => {
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const navigate = useNavigate();

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
        .select("event_id");

      if (error) throw error;
      return data;
    },
  });

  const { data: userRegistrations } = useQuery({
    queryKey: ["user-registrations"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("event_registrations")
        .select("event_id")
        .eq("user_id", user.id);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="text-white">Loading events...</div>;
  }

  const registrationCounts = registrations?.reduce((acc, reg) => {
    acc[reg.event_id] = (acc[reg.event_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const userRegisteredEventIds = userRegistrations?.map((reg) => reg.event_id) || [];

  const upcomingEvents = events?.filter(
    (event) => new Date(event.date) > new Date()
  );
  const registeredEvents = events?.filter((event) =>
    userRegisteredEventIds.includes(event.id)
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
          value="points"
          className="flex-1 data-[state=active]:bg-accent"
          onClick={() => navigate("/add-points")}
        >
          <Wallet className="w-4 h-4 mr-2" />
          Add Points
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="m-0">
        <div className="grid grid-cols-1 gap-4">
          {upcomingEvents?.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={format(new Date(event.date), "MMM d @ h:mm a")}
              location={event.location}
              instructor={event.instructor}
              description={event.description || ""}
              maxCapacity={event.max_capacity}
              contactPhone={event.contact_phone}
              contactEmail={event.contact_email}
              addressLine1={event.address_line1}
              addressLine2={event.address_line2}
              city={event.city}
              isRegistered={userRegisteredEventIds.includes(event.id)}
              registrationCount={registrationCounts?.[event.id] || 0}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="points" className="m-0">
        <div className="text-center py-8">
          <p className="text-gray-400">Click "Add Points" to purchase points packages</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
