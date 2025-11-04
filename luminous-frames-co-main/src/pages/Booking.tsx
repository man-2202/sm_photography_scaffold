import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const SERVICES: { key: string; title: string; desc: string }[] = [
  { key: 'wedding', title: 'Wedding', desc: 'Coverage tailored to your day — ceremony, portraits, and highlights.' },
  { key: 'portrait', title: 'Portraits', desc: 'Studio or location sessions for individuals, couples or families.' },
  { key: 'commercial', title: 'Commercial', desc: 'Brand and product photography for marketing use.' },
  { key: 'videography', title: 'Videography', desc: 'Event & highlight films with cinematic editing.' },
];

const Booking = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', eventType: '', location: '', eventDate: '', message: ''
  });

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/invites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json().catch(() => ({} as any));
      if (res.ok) {
        alert('Booking request sent — we will contact you soon.');
        setForm({ name: '', email: '', phone: '', eventType: '', location: '', eventDate: '', message: '' });
      } else {
        alert(json.error || 'Submission failed');
      }
    } catch (err: any) {
      alert(err?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="booking-page min-h-screen bg-background text-foreground">
      <div className="booking-hero">
        <div className="max-w-5xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <p className="text-sm uppercase tracking-[0.25em] text-accent mb-3 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>Book a Session</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Request a quote</h1>
            <p className="text-base text-muted-foreground max-w-lg leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>Select a service and provide the date and venue — we'll respond with availability and a tailored quote.</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {SERVICES.map((s, i) => (
                <div key={s.key} className="service-card p-3 bg-card text-sm service-card-accent animate-float-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <h4 className="font-medium">{s.title}</h4>
                  <p className="text-muted-foreground mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <form onSubmit={submit} className="booking-form p-6 bg-popover rounded-lg shadow-medium">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} required className="bg-background focus-sea" />
                <Input placeholder="Email" type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} required className="bg-background focus-sea" />
                <Input placeholder="Phone (optional)" value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} className="bg-background focus-sea" />
                <select className="bg-background border border-border rounded-md p-2 focus-sea" value={form.eventType} onChange={(e)=>setForm({...form, eventType: e.target.value})} required>
                  <option value="">Service</option>
                  {SERVICES.map(s => <option key={s.key} value={s.key}>{s.title}</option>)}
                </select>
                <Input type="date" value={form.eventDate} onChange={(e)=>setForm({...form, eventDate: e.target.value})} required className="bg-background focus-sea" />
                <Input type="text" placeholder="Venue / Location" value={form.location} onChange={(e)=>setForm({...form, location: e.target.value})} className="bg-background focus-sea" />
              </div>

              <div className="mt-3">
                <Textarea placeholder="Additional details (optional)" value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} className="min-h-[100px] bg-background" />
              </div>

              <div className="mt-4 text-right">
                <Button type="submit" size="lg" className="btn-sea animate-pulse-glow" disabled={loading}>{loading ? 'Sending...' : 'Request Quote'}</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Booking;
