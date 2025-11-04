import { Camera, Heart, Users, Briefcase } from "lucide-react";
import serviceWedding from "@/assets/service-wedding.jpg";
import serviceFamily from "@/assets/service-family.jpg";
import serviceFashion from "@/assets/service-fashion.jpg";
import serviceCommercial from "@/assets/service-commercial.jpg";

const services = [
  {
    icon: Heart,
    title: "Wedding Photography",
    description: "Elegant documentation of your special day, capturing every precious moment with artistry and attention to detail.",
    image: serviceWedding,
  },
  {
    icon: Users,
  title: "Portrait Photography",
    description: "Timeless portraits that celebrate the unique personality and bonds of you and your loved ones.",
    image: serviceFamily,
  },
  {
    icon: Camera,
    title: "Birthday Photography",
    description: "Joyful event photography capturing parties, milestones, and candid moments so you can relive every celebration.",
    image: serviceFashion,
  },
  {
    icon: Briefcase,
    title: "Commercial Photography",
    description: "Professional imagery for brands seeking to elevate their visual identity and connect with their audience.",
    image: serviceCommercial,
  },
];

const Services = () => {
  return (
    <section id="services" className="section-spacing section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm uppercase tracking-[0.25em] text-accent mb-4 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Comprehensive photography services tailored to capture your unique story
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group animate-fade-in-up overflow-hidden rounded-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-[400px] overflow-hidden">
                {/* Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="transform translate-y-0 transition-transform duration-300">
                    <div className="p-3 rounded-sm bg-accent/20 text-accent inline-block mb-4">
                      <service.icon size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-3xl font-serif font-semibold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
