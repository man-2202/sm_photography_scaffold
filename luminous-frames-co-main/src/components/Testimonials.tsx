import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah & Michael",
    role: "Wedding Clients",
    text: "SM Photography captured our wedding day perfectly. Every moment was beautifully documented with such artistry and emotion. The photos are absolutely stunning and we will treasure them forever.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Portrait Client",
    text: "The portrait session was an incredible experience. The photographer made me feel comfortable and confident, and the results exceeded all my expectations. Truly professional and talented.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Corporate Client",
    text: "We hired SM Photography for our brand campaign and couldn't be happier. The commercial shots perfectly captured our vision and elevated our brand identity. Highly recommended for any business.",
    rating: 5,
  },
  {
    name: "Jennifer & Tom",
    role: "Family Session",
    text: "Our family photos are beyond beautiful. The photographer captured genuine moments and the love we share. These images will be cherished for generations. Thank you for your amazing work!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="section-spacing section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm uppercase tracking-[0.25em] text-accent mb-4 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Client Reviews
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            What our clients say about their experience working with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group animate-fade-in-up p-8 rounded-sm bg-card hover:shadow-[var(--shadow-medium)] transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <Quote className="text-accent" size={36} />
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-2 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-accent text-xl">★</span>
                ))}
              </div>
              
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
