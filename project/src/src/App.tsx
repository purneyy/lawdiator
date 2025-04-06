
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HowToPlay from "./pages/HowToPlay";
import CaseSelector from "./pages/CaseSelector";
import GamePlay from "./pages/GamePlay";
import NotFound from "./pages/NotFound";
import FloatingChatbot from "./components/FloatingChatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FloatingChatbot />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/game/select" element={<CaseSelector />} />
          <Route path="/game/:id" element={<GamePlay />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
