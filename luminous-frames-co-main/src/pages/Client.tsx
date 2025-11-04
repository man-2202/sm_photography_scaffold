import About from '../components/About';
import BookingSection from '../components/BookingSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Client = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="section-padding section-spacing bg-gradient-to-br from-green-100 via-white to-green-50 animate-fade-in text-center">
        <h1 className="text-5xl md:text-6xl font-serif font-extrabold mb-4 text-primary leading-tight">
          Welcome, valued clients
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          View, download, and book your exclusive session. Experience personal, luxury photography with SM Photography.
        </p>
        <a
          href="#gallery"
          className="inline-block btn-sea px-8 py-4 text-lg font-semibold mt-3 rounded-full shadow hover-lift transition"
        >
          View Gallery
        </a>
      </section>
      {/* Gallery Preview */}
      <section id="gallery" className="section-padding section-spacing bg-white">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3 text-primary">Curated Client Gallery</h2>
          <p className="text-muted-foreground mb-8">Aesthetic highlights from recent client sessions. Download or request prints anytime.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {['portfolio-1','portfolio-2','portfolio-3','portfolio-4','portfolio-5','portfolio-6'].map((img, i) => (
            <div key={img} className="relative group rounded-lg overflow-hidden shadow-md">
              <img src={`/assets/${img}.jpg`} alt={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/5 to-transparent opacity-0 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-4">
                <button className="btn-sea w-full py-2 mt-auto rounded-md shadow-lg">Download</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-3">How it Works</h3>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mt-6">
            {[
              {title: "Book", desc: "Choose your session and preferred date."},
              {title: "Shoot", desc: "Enjoy a professional, personal session."},
              {title: "Gallery", desc: "Receive, view, download, or share your memories."}
            ].map((step, i) => (
              <div key={step.title} className="bg-white rounded-xl shadow p-8 flex-1 animate-fade-in-up">
                <div className="text-4xl mb-4 text-primary font-serif font-extrabold">0{i+1}</div>
                <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BookingSection />
      <Testimonials />
      <About />
      <Footer />
    </div>
  );
};

export default Client;
