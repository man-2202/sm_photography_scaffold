import React, { useEffect, useState } from 'react';
import BookingModal from '@/components/BookingModal';
import CloudinaryUploader from '@/components/CloudinaryUploader';

// Pastel wedding themed Pricing & Packages page
// Uses Tailwind CSS classes defined in the project

const PriceCard = ({ pkg, onBook }) => {
  return (
    <div className="bg-[#fbecec] rounded-2xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="text-center">
        <h3 className="font-serif text-2xl mb-2">{pkg.name}</h3>
        <div className="text-4xl font-bold text-[#b8860b] mb-4">₹{(pkg.price/100).toLocaleString()}</div>
        <p className="text-sm text-muted-foreground mb-4">{pkg.hours}</p>
      </div>

      <ul className="space-y-2 mb-6 text-sm">
        <li className="flex justify-between"><span>Photographers</span><strong>{pkg.photographers}</strong></li>
        <li className="flex justify-between"><span>Edited Photos</span><strong>{pkg.editedPhotos}</strong></li>
        <li className="flex justify-between"><span>Album Prints</span><strong>{pkg.albumPrints ? pkg.albumPrints : '—'}</strong></li>
        <li className="flex justify-between"><span>Drone</span><strong>{pkg.droneIncluded ? 'Yes' : 'No'}</strong></li>
        <li className="flex justify-between"><span>Delivery</span><strong>{pkg.deliveryTime}</strong></li>
      </ul>

      <div className="text-center">
        <button onClick={() => onBook(pkg)} className="px-6 py-2 rounded-lg bg-[#ffdede] hover:bg-[#ffd0d0] border border-[#f7c6c6] font-medium transition-shadow shadow-sm hover:shadow-md">
          Book Now
        </button>
      </div>
    </div>
  );
};

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-muted p-4 rounded-xl bg-white/60">
      <button className="w-full text-left flex justify-between items-center" onClick={() => setOpen(!open)}>
        <span className="font-medium">{q}</span>
        <span className="ml-4 text-muted">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="mt-3 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
};

const Testimonials = ({ items }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % items.length), 4000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <div className="space-y-4">
      <div className="bg-[#fffaf0] p-6 rounded-2xl shadow-md min-h-[120px] flex items-center justify-center">
        <blockquote className="text-center max-w-2xl">
          <p className="italic text-lg">"{items[idx].quote}"</p>
          <footer className="mt-3 text-sm font-medium">— {items[idx].author}</footer>
        </blockquote>
      </div>
      <div className="flex justify-center gap-2">
        {items.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full ${i === idx ? 'bg-[#ffdede]' : 'bg-[#f1dede]'}`}></button>
        ))}
      </div>
    </div>
  );
};

export default function PricingPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/packages')
      .then(r => r.json())
      .then(json => {
        if (!mounted) return;
        if (json?.ok && json.packages) setPackages(json.packages);
        else setPackages([]);
      })
      .catch(() => setPackages([]))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  const dummy = [
    { name: 'Basic Package', price: 4999900, hours: '4 hours', photographers: 1, editedPhotos: 200, albumPrints: 1, droneIncluded: false, deliveryTime: '2 weeks' },
    { name: 'Premium Package', price: 8999900, hours: '8 hours', photographers: 2, editedPhotos: 500, albumPrints: 2, droneIncluded: true, deliveryTime: '3 weeks' },
    { name: 'Royal Package', price: 14999900, hours: 'Full day (12 hours)', photographers: 3, editedPhotos: 1000, albumPrints: 3, droneIncluded: true, deliveryTime: '4 weeks' }
  ];

  const data = packages.length ? packages : dummy;

  function handleBook(pkg) {
    setSelectedPackage(pkg);
    setModalOpen(true);
  }

  const testimonials = [
    { quote: 'They captured our day perfectly — every emotion, every smile.', author: 'Asha & Raj' },
    { quote: 'Elegant photography and the album is a treasure. Highly recommend.', author: 'Priya K.' },
    { quote: 'Professional, punctual and so creative with shots.', author: 'Meera & Karan' }
  ];

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-[#fffdf6] to-[#fbecec] px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-6xl text-[#b8860b] mb-4">Wedding Photography Packages</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Timeless wedding photography crafted with love — choose the package that fits your day.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {loading ? (
            <div className="col-span-3 text-center">Loading...</div>
          ) : (
            data.map((pkg, i) => (
              <PriceCard key={i} pkg={pkg} onBook={handleBook} />
            ))
          )}
        </section>

        {/* Booking modal */}
        <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} selectedPackage={selectedPackage} />

        <section className="mb-12">
          <h2 className="font-serif text-3xl text-[#b8860b] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem q="How do I book a package?" a="Click Book Now and fill in your details. We'll reach out to confirm availability and next steps." />
            <FAQItem q="Is travel included?" a="Travel within the city is included. For outstation events, additional travel and accommodation charges may apply." />
            <FAQItem q="Can I customize a package?" a="Yes — we can tailor packages (hours/photographers/album) based on your needs. Contact us to discuss." />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-3xl text-[#b8860b] mb-6">Testimonials</h2>
          <Testimonials items={testimonials} />
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-3xl text-[#b8860b] mb-6">Upload a sample</h2>
          <p className="text-muted-foreground mb-4">Try a direct image upload to Cloudinary (unsigned or signed via server).</p>
          <CloudinaryUploader onUploaded={(url) => alert('Uploaded: ' + url)} />
        </section>

        <footer className="text-center text-sm text-muted-foreground mt-12">© {new Date().getFullYear()} SM Photography — Capturing moments with elegance.</footer>
      </div>
    </div>
  );
}
