import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import PricingPage from "./pages/pricingPage";
import NotFound from "./pages/NotFound";
import Me from "./pages/Me";
import ClientGallery from "./pages/ClientGallery";
import Booking from "./pages/Booking";
import BookingOnly from "./pages/BookingOnly";
import ClientLogin from "./pages/ClientLogin";
import AdminLogin from "./pages/AdminLogin";
import ClientLayout from "./client/ClientLayout";
import ClientAlbums from "./client/pages/ClientAlbums";
import ClientAlbumView from "./client/pages/ClientAlbumView";
import ComingSoon from "./admin/components/ComingSoon";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Clients from "./admin/pages/Clients";
import Bookings from "./admin/pages/Bookings";
import Albums from "./admin/pages/Albums";
import Photos from "./admin/pages/Photos";
import Upload from "./admin/pages/Upload";
import Contracts from "./admin/pages/Contracts";
import Inquiries from "./admin/pages/Inquiries";
import Payments from "./admin/pages/Payments";
import Settings from "./admin/pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking-section" element={<BookingOnly />} />
            <Route path="/me" element={<Me />} />
            <Route path="/gallery/:slug" element={<ClientGallery />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/client/login" element={<ClientLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/client" 
              element={
                <ProtectedRoute requireClient>
                  <ClientLayout />
                </ProtectedRoute>
              }
            >
              <Route path="albums" element={<ClientAlbums />} />
              <Route path="albums/:albumId" element={<ClientAlbumView />} />
              <Route path="favorites" element={<ComingSoon title="Favorites" />} />
              <Route path="feedback" element={<ComingSoon title="Feedback" />} />
              <Route path="settings" element={<ComingSoon title="Settings" />} />
            </Route>
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="clients" element={<Clients />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="albums" element={<Albums />} />
              <Route path="photos" element={<Photos />} />
              <Route path="upload" element={<Upload />} />
              <Route path="contracts" element={<Contracts />} />
              <Route path="inquiries" element={<Inquiries />} />
              <Route path="payments" element={<Payments />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
