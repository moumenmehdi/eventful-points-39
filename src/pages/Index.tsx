
import { Header } from "@/components/Header";
import { EventList } from "@/components/EventList";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark pb-16">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <EventList />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
