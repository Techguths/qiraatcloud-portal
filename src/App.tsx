import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import About from "./pages/About";
import Blog from "./pages/Blog";
import GetStarted from "./pages/GetStarted";
import CreateAcademy from "./pages/onboarding/CreateAcademy";
import StudentRegistration from "./pages/onboarding/StudentRegistration";
import InviteCode from "./pages/onboarding/InviteCode";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/onboarding/create-academy" element={<CreateAcademy />} />
          <Route path="/onboarding/student" element={<StudentRegistration />} />
          <Route path="/onboarding/invite" element={<InviteCode />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
