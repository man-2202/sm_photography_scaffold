import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="section-padding py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="flex flex-col">
              <h3 className="text-3xl md:text-2xl font-display font-bold mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>SM Photography</h3>
              <div className="w-16 h-1 mb-3 rounded-full" style={{ background: 'linear-gradient(90deg, rgba(160,200,120,0.95), rgba(221,235,157,0.9))' }} />
              <p className="text-muted-foreground text-sm max-w-xs italic" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Capturing timeless moments with elegance and artistry since 2014.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium mb-4 uppercase tracking-[0.12em] text-sm text-foreground/80">Quick Links</h4>
              <ul className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
                <li>
                  <a href="/gallery" className="nav-link">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="/#services" className="nav-link">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/#about" className="nav-link">
                    About
                  </a>
                </li>
                <li>
                  <a href="/faq" className="nav-link">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="nav-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-medium mb-4 uppercase tracking-[0.12em] text-sm text-foreground/80">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/privacy" className="nav-link">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="nav-link">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-medium mb-4 uppercase tracking-[0.12em] text-sm text-foreground/80">Connect</h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/sm_photography_world?igsh=eXZ4MmFxbW82Z3Zz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/10 hover:bg-accent/10 transition-shadow shadow-sm"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/10 hover:bg-accent/10 transition-shadow shadow-sm"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/10 hover:bg-accent/10 transition-shadow shadow-sm"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p className="text-muted-foreground/80">© {currentYear} SM Photography. All rights reserved.</p>
              <p className="text-muted-foreground/70 text-sm">Designed with care · Secure payments · Fast response</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
