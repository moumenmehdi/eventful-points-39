
import { Header } from "@/components/Header";
import { EventList } from "@/components/EventList";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <EventList />
      </main>
    </div>
  );
};

export default Index;
