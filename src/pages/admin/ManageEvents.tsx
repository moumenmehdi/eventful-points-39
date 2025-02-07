import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Trash, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

const ManageEvents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const eventData = {
      title: formData.get("title") as string,
      instructor: formData.get("instructor") as string,
      date: formData.get("date") as string,
      duration: parseInt(formData.get("duration") as string),
      location: formData.get("location") as string,
      max_capacity: parseInt(formData.get("max_capacity") as string),
      description: formData.get("description") as string,
      contact_phone: formData.get("contact_phone") as string,
      contact_email: formData.get("contact_email") as string,
      address_line1: formData.get("address_line1") as string,
      address_line2: formData.get("address_line2") as string,
      city: formData.get("city") as string,
    };

    try {
      if (editingEvent) {
        await supabase
          .from("events")
          .update(eventData)
          .eq("id", editingEvent.id);
        toast({
          title: "Success",
          description: "Event updated successfully",
        });
      } else {
        await supabase.from("events").insert([eventData]);
        toast({
          title: "Success",
          description: "Event created successfully",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setIsOpen(false);
      setEditingEvent(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save event",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase.from("events").delete().eq("id", id);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete event",
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark pb-16">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Manage Events</h1>
          <Button
            onClick={() => {
              setEditingEvent(null);
              setIsOpen(true);
            }}
            className="bg-accent hover:bg-accent/90"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>

        <div className="space-y-4">
          {events?.map((event) => (
            <div
              key={event.id}
              className="bg-dark-secondary p-4 rounded-lg border border-gray-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {event.title}
                  </h3>
                  <p className="text-gray-400">{event.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingEvent(event);
                      setIsOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? "Edit Event" : "Create New Event"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="title"
                placeholder="Event Title"
                defaultValue={editingEvent?.title}
                required
              />
              <Input
                name="instructor"
                placeholder="Instructor"
                defaultValue={editingEvent?.instructor}
                required
              />
              <Input
                type="datetime-local"
                name="date"
                defaultValue={editingEvent?.date?.split(".")[0]}
                required
              />
              <Input
                type="number"
                name="duration"
                placeholder="Duration (minutes)"
                defaultValue={editingEvent?.duration}
                required
              />
              <Input
                name="location"
                placeholder="Location"
                defaultValue={editingEvent?.location}
                required
              />
              <Input
                type="number"
                name="max_capacity"
                placeholder="Maximum Capacity"
                defaultValue={editingEvent?.max_capacity}
                required
              />
              <Textarea
                name="description"
                placeholder="Description"
                defaultValue={editingEvent?.description}
              />
              <Input
                name="contact_phone"
                placeholder="Contact Phone"
                defaultValue={editingEvent?.contact_phone}
              />
              <Input
                name="contact_email"
                placeholder="Contact Email"
                defaultValue={editingEvent?.contact_email}
              />
              <Input
                name="address_line1"
                placeholder="Address Line 1"
                defaultValue={editingEvent?.address_line1}
              />
              <Input
                name="address_line2"
                placeholder="Address Line 2"
                defaultValue={editingEvent?.address_line2}
              />
              <Input
                name="city"
                placeholder="City"
                defaultValue={editingEvent?.city}
              />
              <Button type="submit" className="w-full">
                {editingEvent ? "Update Event" : "Create Event"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>
      <BottomNav />
    </div>
  );
};

export default ManageEvents;