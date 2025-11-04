const About = () => {
  return (
    <section id="about" className="section-spacing section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center animate-fade-in">
          <p className="text-sm uppercase tracking-[0.25em] text-accent mb-4 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Our Story
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            About SM Photography
          </h2>
        </div>

        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed animate-fade-in-up" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          <p>
            Founded with a passion for capturing life's most precious moments, SM Photography 
            has become synonymous with elegance, artistry, and authenticity. We believe that 
            photography is more than just taking pictures—it's about telling stories, preserving 
            memories, and creating timeless art.
          </p>
          <p>
            Our approach combines technical excellence with a deep understanding of light, 
            composition, and emotion. Every session is tailored to reflect your unique personality 
            and vision, ensuring that each photograph is as distinctive as the moment it captures.
          </p>
          <p>
            With years of experience across weddings, portraits, fashion, and commercial photography, 
            we've had the privilege of working with clients who value sophistication, quality, and 
            the beauty of genuine moments beautifully preserved.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          <div className="animate-scale-in">
            <div className="text-4xl md:text-5xl font-serif font-semibold text-accent mb-2">500+</div>
            <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground">Sessions</p>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl md:text-5xl font-serif font-semibold text-accent mb-2">200+</div>
            <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground">Weddings</p>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl md:text-5xl font-serif font-semibold text-accent mb-2">10+</div>
            <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground">Years</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
