import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const BookingSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [service, setService] = useState("Portrait");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now show a client-side confirmation. Backend integration can
    // post this payload to the API route (e.g. /api/quotes) in a follow-up.
    toast({
      title: "Request sent",
      description: (
        <div>
          <div className="text-sm">We received your request and will email availability & a quote.</div>
          <div className="mt-2 text-xs text-muted-foreground">{name} — {service} — {date || "no date"} — {venue || "no venue"}</div>
        </div>
      ),
    });
    // clear inputs to indicate the submission
    setName("");
    setDate("");
    setVenue("");
    setService("Portrait");
  };

  return (
    <section className="section-padding section-spacing bg-background">
      <div className="max-w-5xl mx-auto text-center animate-float-up">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3">Book a session</h2>
        <p className="text-muted-foreground mb-6">Select a service and provide date & venue — we'll send availability and a quote.</p>
        <form onSubmit={handleSubmit} className="mt-6 max-w-2xl mx-auto text-left booking-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              className="w-full px-3 py-2 border border-input rounded-md focus-sea"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Your name"
              required
            />
            <select
              className="w-full px-3 py-2 border border-input rounded-md focus-sea bg-background"
              value={service}
              onChange={(e) => setService(e.target.value)}
              aria-label="Service"
            >
              <option>Portrait</option>
              <option>Wedding</option>
              <option>Birthday</option>
              <option>Commercial events</option>
              <option>Fashion photography</option>
              <option>Studio setup photography</option>
            </select>
            <input
              type="date"
              className="w-full px-3 py-2 border border-input rounded-md focus-sea"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              aria-label="Preferred date"
            />
            <input
              className="w-full px-3 py-2 border border-input rounded-md focus-sea"
              placeholder="Venue / Location"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              aria-label="Venue"
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <Button type="submit" size="lg" className="btn-sea">Request Quote</Button>
            <Button size="lg" variant="outline" onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>
              Contact
            </Button>
          </div>
        </form>
        <div className="mt-6 flex justify-center gap-3">
          <div className="px-3 py-1 rounded-full text-sm bg-accent/10 text-accent">Fast response</div>
          <div className="px-3 py-1 rounded-full text-sm bg-accent/10 text-accent">Custom quotes</div>
          <div className="px-3 py-1 rounded-full text-sm bg-accent/10 text-accent">Secure payments</div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
