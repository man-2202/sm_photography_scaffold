import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    eventType: "",
    eventDate: "",
    location: "",
  });

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/invites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json().catch(() => ({} as any));

      if (res.ok && (json.ok || json._id || json.invite)) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your inquiry. We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", phone: "", message: "", eventType: "", eventDate: "", location: "" });
      } else {
        toast({
          title: "Submission failed",
          description: json.error || "Could not send message. Please try again later.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Network error",
        description: err?.message || "Failed to reach the server.",
      });
    }
  };

  return (
    <section id="contact" className="section-spacing section-padding bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm uppercase tracking-[0.25em] text-accent mb-4 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Let's create something beautiful together. Reach out to discuss your photography needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h3 className="text-2xl font-serif font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                Whether you're planning a wedding, need professional portraits, or have a commercial 
                project in mind, we'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-sm bg-accent/10 text-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <a href="mailto:info@smphotography.com" className="text-muted-foreground hover:text-accent transition-colors">
                    photographersubramani@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-sm bg-accent/10 text-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-medium mb-1">Phone</p>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-accent transition-colors">
                    +91 9840108540
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-sm bg-accent/10 text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-medium mb-1">Studio</p>
                  <p className="text-muted-foreground">
                    Madurai street,Gokulam colony<br />
                    karanipudchery,urapkkam-603202
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <a
                  href="https://wa.me/919840108540"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="p-3 rounded-sm bg-[#25D366]/10 text-[#25D366] inline-flex items-center justify-center"
                >
                  {/* Inline WhatsApp SVG with explicit brand color to avoid inheritance issues */}
                  <svg className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M20.52 3.48c-2.37-2.37-5.5-3.48-8.94-3.48C5.36 0 .18 5.18.18 11.4c0 2.01.52 3.98 1.5 5.72L0 24l6.02-1.54c1.66.9 3.54 1.38 5.56 1.38 6.22 0 11.4-5.18 11.4-11.4 0-3.44-1.11-6.57-3.06-8.96zM12 21.36c-1.78 0-3.51-.48-5.02-1.38l-.36-.22L4 20l1.26-2.62-.23-.37C3.05 14.35 2 12.03 2 9.4 2 5.04 5.64 1.4 10 1.4c2.5 0 4.81.87 6.6 2.47 1.79 1.6 2.78 3.89 2.78 6.53 0 4.36-3.64 7.99-8 7.99z" />
                    <path d="M17.56 14.14c-.3-.15-1.78-.87-2.06-.97-.28-.1-.49-.15-.7.15s-.8.97-.98 1.17c-.18.2-.36.22-.66.07-.3-.15-1.13-.42-2.15-1.32-.8-.71-1.34-1.58-1.5-1.88-.16-.3-.02-.46.13-.61.13-.12.3-.32.45-.48.15-.15.2-.26.3-.43.1-.17.05-.32-.03-.47-.08-.15-.7-1.7-.96-2.34-.25-.62-.51-.54-.7-.55l-.6-.01c-.2 0-.52.07-.8.33-.28.27-1.07 1.05-1.07 2.56 0 1.5 1.1 2.95 1.25 3.15.15.2 2.17 3.5 5.26 4.9 3.09 1.4 3.09.94 3.65.88.57-.06 1.78-.72 2.03-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.17-.57-.32z" />
                  </svg>
                </a>
                <div>
                  <p className="font-medium mb-1">WhatsApp</p>
                  <a
                    href="https://wa.me/919840108540"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#25D366] transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background"
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-background"
              />
            </div>
            <div>
              <Textarea
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="min-h-[150px] bg-background resize-none"
              />
            </div>
            {/* Booking fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1">Type</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  required
                  className="w-full bg-background border border-border rounded-md p-2"
                >
                  <option value="">Select type</option>
                  <option value="photography">Photography</option>
                  <option value="videography">Videography</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Venue</label>
                <Input
                  placeholder="Event venue / location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Date</label>
                <Input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="bg-background"
                  required
                />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Book a Session
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
