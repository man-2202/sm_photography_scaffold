import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Download, Heart, MessageSquare, Share, Star, ArrowLeft, Image as ImageIcon, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Photo {
  id: string;
  cloudinaryUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  isFavorited?: boolean;
}

interface ClientAlbumDetails {
  id: string;
  name: string;
  description?: string;
  eventDate: string;
  photos: Photo[];
  downloadEnabled: boolean;
  feedbackSubmitted?: boolean;
}

export default function ClientAlbumView() {
  const { albumId } = useParams<{ albumId: string }>();
  const navigate = useNavigate();
  const [album, setAlbum] = useState<ClientAlbumDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const mockData: ClientAlbumDetails = {
          id: "1",
          name: "Summer Wedding Photos",
          description: "Your beautiful summer wedding collection featuring outdoor ceremonies and reception moments",
          eventDate: "2025-06-15",
          photos: Array.from({ length: 24 }).map((_, i) => ({
            id: `photo-${i}`,
            cloudinaryUrl: `/src/assets/portfolio-${(i % 6) + 1}.jpg`,
            thumbnailUrl: `/src/assets/portfolio-${(i % 6) + 1}.jpg`,
            width: 1920,
            height: 1080,
            isFavorited: Math.random() > 0.7
          })),
          downloadEnabled: true,
          feedbackSubmitted: false
        };
        setAlbum(mockData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load album",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (albumId) {
      fetchAlbum();
    }
  }, [albumId, toast]);

  const toggleFavorite = async (photoId: string) => {
    if (!album) return;

    try {
      // Replace with actual API call
      // await fetch(`/api/photos/${photoId}/favorite`, { method: "POST" });
      setAlbum({
        ...album,
        photos: album.photos.map(photo =>
          photo.id === photoId
            ? { ...photo, isFavorited: !photo.isFavorited }
            : photo
        )
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      });
    }
  };

  const handleDownloadRequest = async () => {
    if (!album) return;

    try {
      // Replace with actual API call
      // await fetch(`/api/albums/${album.id}/download-request`, { method: "POST" });
      toast({
        title: "Download Request Sent",
        description: "We'll notify you when your download is ready",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to request download",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (!album) return;

    const shareUrl = `${window.location.origin}/gallery/${album.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: album.name,
          text: album.description,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied",
          description: "Album link copied to clipboard",
        });
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast({
          title: "Error",
          description: "Failed to share album",
          variant: "destructive",
        });
      }
    }
  };

  const submitFeedback = async () => {
    if (!album) return;

    try {
      // Replace with actual API call
      // await fetch(`/api/albums/${album.id}/feedback`, {
      //   method: "POST",
      //   body: JSON.stringify({ rating, comment })
      // });
      setAlbum({ ...album, feedbackSubmitted: true });
      setFeedbackOpen(false);
      setRating(0);
      setComment("");
      toast({
        title: "Thank You!",
        description: "Your feedback has been submitted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading album...</p>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="text-center py-16">
        <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium text-muted-foreground">Album not found</p>
        <Button onClick={() => navigate("/client/albums")} variant="outline" className="mt-4">
          Back to Albums
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/client/albums")}
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 border-b border-border pb-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-serif font-bold">{album.name}</h1>
                {album.description && (
                  <p className="text-muted-foreground text-lg max-w-2xl">
                    {album.description}
                  </p>
                )}
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(album.eventDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <Badge variant="secondary" className="gap-1.5">
                    <ImageIcon className="h-3.5 w-3.5" />
                    {album.photos.length} Photos
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {album.downloadEnabled && (
            <Button onClick={handleDownloadRequest} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download All
            </Button>
          )}
          <Button onClick={handleShare} variant="outline" className="gap-2">
            <Share className="h-4 w-4" />
            Share Album
          </Button>
          {!album.feedbackSubmitted && (
            <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Leave Feedback
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share Your Experience</DialogTitle>
                  <DialogDescription>
                    Help us improve by sharing your thoughts about this collection
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Rating</p>
                    <div className="flex items-center justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Button
                          key={value}
                          variant="ghost"
                          size="icon"
                          onClick={() => setRating(value)}
                          className={`h-12 w-12 rounded-full transition-all ${
                            value <= rating 
                              ? "text-yellow-500 scale-110 bg-yellow-50" 
                              : "text-gray-300 hover:text-yellow-400 hover:scale-105"
                          }`}
                        >
                          <Star className="h-6 w-6" fill={value <= rating ? "currentColor" : "none"} />
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Comments</p>
                    <Textarea
                      placeholder="What did you love about these photos?..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setFeedbackOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={submitFeedback}
                    disabled={rating === 0}
                  >
                    Submit Feedback
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {album.feedbackSubmitted && (
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
              ✓ Feedback Submitted
            </Badge>
          )}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {album.photos.map((photo) => (
          <div 
            key={photo.id} 
            className="relative group aspect-square overflow-hidden rounded-lg cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200"
            onClick={() => setSelectedPhoto(photo.cloudinaryUrl)}
          >
            <img
              src={photo.thumbnailUrl}
              alt=""
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {/* Favorite Button */}
              <div className="absolute top-2 right-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className={`h-9 w-9 backdrop-blur-sm transition-all ${
                    photo.isFavorited 
                      ? "bg-red-500/90 text-white hover:bg-red-600/90 scale-100" 
                      : "bg-white/90 hover:bg-white hover:scale-110 opacity-80"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(photo.id);
                  }}
                >
                  <Heart
                    className="h-4 w-4"
                    fill={photo.isFavorited ? "currentColor" : "none"}
                  />
                </Button>
              </div>

              {/* Photo Info */}
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                    {photo.width} × {photo.height}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
            <img
              src={selectedPhoto}
              alt="Full size"
              className="w-full h-full object-contain"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}