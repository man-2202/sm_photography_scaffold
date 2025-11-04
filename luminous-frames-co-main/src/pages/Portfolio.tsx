import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

type Category = "All" | "Weddings" | "Portraits" | "Birthday" | "Family" | "Commercial" | "Fashion";

interface PortfolioImage {
  src: string;
  alt: string;
  category: Category;
  title: string;
}

const portfolioImages: PortfolioImage[] = [
  {
    src: portfolio1,
    alt: "Wedding photography - elegant bride and groom portrait",
    category: "Weddings",
    title: "Elegant Wedding Ceremony",
  },
  {
    src: portfolio2,
    alt: "Portrait photography - artistic fashion shot",
    category: "Portraits",
    title: "Classic Portrait",
  },
  {
    src: portfolio3,
    alt: "Family photography - golden hour outdoor session",
    category: "Family",
    title: "Family Moments",
  },
  {
    src: portfolio4,
    alt: "Fashion photography - editorial style portrait",
    category: "Fashion",
    title: "Editorial Fashion",
  },
  {
    src: portfolio5,
    alt: "Still life photography - minimalist composition",
    category: "Commercial",
    title: "Product Photography",
  },
  {
    src: portfolio6,
    alt: "Engagement photography - romantic couple at sunset",
    category: "Weddings",
    title: "Engagement Session",
  },
];

// If a backend is available, we will try to load images from it. The backend endpoint
// exposed by the scaffold is GET /api/photos which returns photo documents with
// mediaUrl and thumbUrl fields.
const API_BASE = import.meta.env.VITE_API_BASE || "";

const categories: Category[] = ["All", "Weddings", "Portraits", "Birthday", "Family", "Commercial", "Fashion"];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [lightboxImage, setLightboxImage] = useState<PortfolioImage | null>(null);
  const [images, setImages] = useState<PortfolioImage[]>(portfolioImages);

  useEffect(() => {
    if (!API_BASE) return;

    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/photos`);
        if (!res.ok) return;
        const data = await res.json();
        if (!Array.isArray(data) || !mounted) return;

        const mapped: PortfolioImage[] = data.map((p: any) => ({
          src: p.thumbUrl || p.mediaUrl,
          alt: p.title || p.description || "Photo",
          category: "All",
          title: p.title || "Photo",
        }));

        if (mapped.length) setImages(mapped);
      } catch (err) {
        // ignore - keep static images
      }
    })();

    return () => { mounted = false };
  }, []);

  const filteredImages = selectedCategory === "All" 
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Header */}
        <section className="section-spacing section-padding bg-background">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-accent mb-4 animate-fade-in font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Our Work
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in" style={{ fontFamily: "'Playfair Display', serif" }}>
              Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              A curated collection of our finest photography work across various genres
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="section-padding bg-muted/30 border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-accent text-accent-foreground"
                      : "bg-card hover:bg-accent/10 text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-spacing section-padding bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setLightboxImage(image)}
                  className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer hover-lift animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm uppercase tracking-[0.15em] text-accent mb-1">
                        {image.category}
                      </p>
                      <p className="text-white font-serif text-lg">{image.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2 rounded-sm bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          
          <div className="max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="w-full h-full object-contain animate-scale-in"
            />
            <div className="text-center mt-6">
              <p className="text-sm uppercase tracking-[0.15em] text-accent mb-2">
                {lightboxImage.category}
              </p>
              <p className="text-white font-serif text-2xl">{lightboxImage.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
