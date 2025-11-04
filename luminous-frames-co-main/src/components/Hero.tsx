import heroImage from "@/assets/hero-image.jpg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const goToBooking = () => {
    navigate("/booking");
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Professional photography studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 cinematic-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding text-center max-w-4xl mx-auto pt-20">
        <div className="animate-fade-in-up">
          <p className="text-sm uppercase tracking-[0.25em] mb-6 font-medium" style={{ fontFamily: "'Montserrat', sans-serif", color: "hsl(68, 62%, 77%)" }}>
            Capturing Timeless Moments
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 text-balance leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif", color: "hsl(88, 44%, 57%)" }}>
            Where Art Meets Memory
          </h1>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-balance leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif", color: "hsl(48, 56%, 94%)" }}>
            Professional photography services that transform your precious moments into elegant, 
            timeless works of art.
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={goToBooking}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              Book a Session
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                const element = document.getElementById('services');
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-primary/20 hover:border-primary/40 hover:bg-background/80 transition-all duration-300"
            >
              Our Services
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-foreground/30 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
