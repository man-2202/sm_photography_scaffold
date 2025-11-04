import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Photo = {
  _id: string;
  title?: string;
  description?: string;
  mediaUrl: string;
  thumbUrl?: string;
};

const ClientGallery = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/galleries/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) setGallery(data.gallery);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="p-12 text-center">Loading…</div>;
  if (!gallery) return <div className="p-12 text-center">Gallery not found.</div>;

  return (
    <div className="section-padding section-spacing bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold">{gallery.name || 'Client Gallery'}</h1>
          {gallery.clientName && <p className="text-muted-foreground">For {gallery.clientName}</p>}
          <p className="mt-3 text-sm text-muted-foreground">Shareable link: <span className="font-mono">{window.location.href}</span></p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.photos && gallery.photos.length > 0 ? (
            gallery.photos.map((p: Photo) => (
              <div key={p._id} className="overflow-hidden rounded-lg shadow-medium hover-lift bg-card">
                <img src={p.mediaUrl} alt={p.title || 'photo'} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-lg">{p.title}</h4>
                  {p.description && <p className="text-sm text-muted-foreground mt-2">{p.description}</p>}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-muted-foreground">No photos in this gallery yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientGallery;
