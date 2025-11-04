import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <section className="section-spacing section-padding bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="prose prose-lg max-w-none animate-fade-in-up space-y-8">
              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At SM Photography, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Name, email address, and phone number when you contact us</li>
                  <li>Session details and preferences for photography bookings</li>
                  <li>Payment information for service transactions</li>
                  <li>Photos and images shared during our collaboration</li>
                  <li>Communication records and correspondence</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Provide and improve our photography services</li>
                  <li>Communicate with you about bookings and inquiries</li>
                  <li>Process payments and manage transactions</li>
                  <li>Send you updates about your projects</li>
                  <li>Market our services (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Image Rights and Usage</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Unless otherwise agreed in writing, SM Photography retains the copyright to all images created during our sessions. We may use images for portfolio display, marketing, and promotional purposes. If you prefer your images remain private, please inform us in writing, and we will honor your request.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website uses cookies to enhance your browsing experience. You can control cookie settings through your browser preferences. Disabling cookies may affect the functionality of certain features on our website.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may use third-party services for payment processing, email communications, and website analytics. These providers have their own privacy policies and handle data according to their terms.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request restriction of processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
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

export default Privacy;
