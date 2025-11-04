import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How many photos will I receive?",
    answer: "The number of photos varies depending on the package and type of session. For weddings, clients typically receive 400-600 edited images. Portrait sessions include 30-50 images, while commercial projects are customized based on your needs. All packages include fully edited, high-resolution images.",
  },
  {
    question: "Do you travel for shoots?",
    answer: "Yes! We love traveling for photography projects. We regularly work with clients throughout the region and are available for destination weddings and shoots. Travel fees may apply depending on the location, and we'll provide a detailed quote including all travel-related costs.",
  },
  {
    question: "What's your turnaround time?",
    answer: "Wedding photos are typically delivered within 6-8 weeks. Portrait and family sessions are ready in 2-3 weeks. Commercial projects vary based on complexity but are usually completed within 1-2 weeks. Rush delivery is available for an additional fee if needed.",
  },
  {
    question: "Do you provide raw files?",
    answer: "Our standard packages include fully edited, high-resolution JPEGs ready for printing and sharing. Raw files are not typically included as they require significant post-processing expertise. However, raw files can be purchased as an add-on for select packages upon request.",
  },
  {
    question: "What are your payment terms?",
    answer: "We require a 30% non-refundable retainer to secure your date, with the balance due one week before your session or event. We accept various payment methods including credit cards, bank transfers, and digital payments for your convenience.",
  },
  {
    question: "Can I request specific shots or poses?",
    answer: "Absolutely! We encourage you to share any specific shots, poses, or inspiration images you have in mind. We'll work together to create a shot list that captures your vision while also incorporating our artistic style and expertise to deliver the best possible results.",
  },
  {
    question: "Do you offer prints and albums?",
    answer: "Yes, we offer professional-quality prints, canvas wraps, and custom-designed albums. These can be ordered during or after your session. We work with premium printing labs to ensure the highest quality products that will last for generations.",
  },
  {
    question: "What happens if you're unable to shoot due to illness or emergency?",
    answer: "In the unlikely event of an emergency, we have a network of trusted professional photographers who can step in. Your date will be covered, and we'll work closely with the backup photographer to ensure your vision is maintained. Client satisfaction is our top priority.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Header */}
        <section className="section-spacing section-padding bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <p className="text-sm uppercase tracking-[0.25em] text-accent mb-4 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Common Questions
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Find answers to common questions about our photography services
              </p>
            </div>

            {/* FAQ Accordion */}
            <Accordion type="single" collapsible className="w-full animate-fade-in-up">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg hover:text-accent" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Contact CTA */}
            <div className="mt-16 text-center p-8 rounded-sm bg-muted/30 animate-fade-in-up">
              <h3 className="text-2xl font-serif font-semibold mb-3">
                Still Have Questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                We're here to help! Feel free to reach out with any questions you may have.
              </p>
              <a
                href="/#contact"
                className="inline-block px-8 py-3 rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
