import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-soft">
      <div className="section-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="text-2xl font-display font-bold tracking-tighter transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>SM Photography</a>

          {/* Keep navigation inside the menu button on all sizes. Desktop horizontal links removed. */}

          {/* Menu Button (visible on all sizes) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={
              `menu-button relative p-3 rounded-full text-foreground transition-transform duration-200 transform flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ` +
              (isOpen
                ? 'bg-gradient-to-r from-accent/60 to-primary/40 scale-105 ring-4 ring-accent/10 shadow-lg z-[70]'
                : 'bg-gradient-to-r from-primary/50 to-accent/30 hover:scale-105 shadow-md')
            }
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {/* Icon switches from hamburger to X, with smooth rotation */}
            <div className={`transition-transform duration-250 ${isOpen ? 'rotate-90' : 'rotate-0'} glow-on-hover`}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </div>
            {/* subtle decorative pulse when closed */}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent animate-pulse opacity-80" aria-hidden />
            )}
          </button>
        </div>

        {/* Fullscreen navigation overlay (used for all sizes) */}
        {isOpen && (
          // overlay starts below the header so the logo and button remain visible
          <div className="fixed left-0 right-0 top-20 bottom-0 z-40 bg-background/95 backdrop-blur-lg flex items-start justify-end animate-fade-in">
            <div className="w-full max-w-xs h-full flex flex-col pt-24 px-8 bg-gradient-to-br from-muted/30 via-background to-background border-l border-border/50 shadow-xl">
              <div className="flex flex-col gap-8 text-right">
                <a href="/gallery" onClick={() => setIsOpen(false)} className="text-xl font-medium nav-link px-4 py-3 rounded-md text-right block hover:bg-accent/10 transition-colors">Gallery</a>
                <a href="/pricing" onClick={() => setIsOpen(false)} className="text-xl font-medium nav-link px-4 py-3 rounded-md text-right block hover:bg-accent/10 transition-colors">Pricing</a>
                <a href="/booking-section" onClick={() => setIsOpen(false)} className="text-xl font-medium nav-link px-4 py-3 rounded-md text-right block hover:bg-accent/10 transition-colors">Booking</a>
                <a href="/client/login" onClick={() => setIsOpen(false)} className="text-xl font-medium nav-link px-4 py-3 rounded-md text-right block hover:bg-accent/10 transition-colors">Client Portal</a>
                <a href="/admin/login" onClick={() => setIsOpen(false)} className="text-xl font-medium nav-link px-4 py-3 rounded-md text-right block hover:bg-accent/10 transition-colors">Admin Portal</a>
                <button onClick={() => { scrollToSection('services'); }} className="text-xl font-medium nav-link px-4 py-3 rounded-md text-right w-full hover:bg-accent/10 transition-colors">Services</button>
                <button onClick={() => { scrollToSection('about'); }} className="text-xl font-medium nav-link px-4 py-3 rounded-md text-right w-full hover:bg-accent/10 transition-colors">About</button>
                <a href="/faq" onClick={() => setIsOpen(false)} className="text-xl font-medium nav-link px-4 py-3 rounded-md text-right block hover:bg-accent/10 transition-colors">FAQ</a>
                <button onClick={() => { scrollToSection('contact'); }} className="text-xl font-medium nav-link px-4 py-3 rounded-md text-right w-full hover:bg-accent/10 transition-colors">Contact</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
