import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <section className="section-spacing section-padding bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6">
                Terms of Service
              </h1>
              <p className="text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="prose prose-lg max-w-none animate-fade-in-up space-y-8">
              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By booking photography services with SM Photography, you agree to be bound by these Terms of Service. Please read them carefully before engaging our services. If you do not agree with any part of these terms, please do not proceed with booking.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Booking and Payment</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A non-refundable retainer of 30% is required to secure your booking date. The remaining balance is due one week prior to your scheduled session or event. Failure to pay the balance on time may result in cancellation of your booking.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Payment can be made via credit card, bank transfer, or approved digital payment methods. All prices are subject to applicable taxes.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Cancellation and Rescheduling</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong>Client Cancellation:</strong> The retainer is non-refundable. If you cancel your booking, the retainer will be forfeited. Cancellations made within 14 days of the scheduled date will result in forfeiture of the full payment.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong>Rescheduling:</strong> One complimentary reschedule is permitted with at least 30 days notice. Additional reschedules may incur a fee.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Photographer Cancellation:</strong> In the unlikely event that we must cancel, you will receive a full refund of all payments made, or the option to reschedule at no additional cost.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Copyright and Usage Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  SM Photography retains full copyright to all images created during your session. You receive a personal license to print, share, and post the delivered images for personal use. Commercial use of images requires written permission and may involve licensing fees.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to use any images from your session for portfolio display, marketing materials, social media, competitions, and promotional purposes unless you opt-out in writing.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Delivery Timeline</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Edited images will be delivered within the timeframe specified in your contract (typically 6-8 weeks for weddings, 2-3 weeks for portraits). Delays may occur due to circumstances beyond our control, including illness, equipment failure, or natural disasters. We will communicate any delays promptly.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Model Release</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By booking our services, you grant SM Photography permission to use your likeness in photographs for promotional purposes unless you specifically opt-out. Minors require parental or guardian consent.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we take every precaution to protect your images, SM Photography is not liable for loss of images due to equipment failure, data corruption, or circumstances beyond our control. We maintain backup systems and insurance, but our liability is limited to a refund of fees paid.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Client Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Clients are responsible for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Arriving on time for scheduled sessions</li>
                  <li>Providing accurate location and timeline information</li>
                  <li>Obtaining necessary permissions for shoot locations</li>
                  <li>Ensuring cooperation from guests during events</li>
                  <li>Providing adequate meal breaks for full-day bookings</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Force Majeure</h2>
                <p className="text-muted-foreground leading-relaxed">
                  SM Photography is not responsible for failure to perform services due to circumstances beyond our control, including but not limited to natural disasters, illness, accidents, or government restrictions. In such cases, we will work with you to reschedule or provide an appropriate resolution.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Dispute Resolution</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Any disputes arising from these terms will be resolved through good faith negotiation. If resolution cannot be reached, disputes will be handled in accordance with local jurisdiction laws.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-muted-foreground mt-4">
                  Email: info@smphotography.com<br />
                  Phone: +1 (234) 567-890
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
