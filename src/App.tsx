
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { EventList } from "@/components/EventList";
import Menu from "@/pages/Menu";
import GiftCode from "@/pages/GiftCode";
import ManageEvents from "@/pages/admin/ManageEvents";
import ManageCodes from "@/pages/admin/ManageCodes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gift-code" element={<GiftCode />} />
          <Route path="/admin/events" element={<ManageEvents />} />
          <Route path="/admin/codes" element={<ManageCodes />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
