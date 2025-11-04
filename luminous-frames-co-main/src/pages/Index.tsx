import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import BookingSection from "@/components/BookingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <section className="divide-y divide-border">
          <Services />
          <BookingSection />
          <Testimonials />
          <About />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
