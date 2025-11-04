import { useState, useEffect } from "react";
import { DashboardShell } from "../components/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, Filter, ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Photo {
  id: string;
  url: string;
  albumName: string;
  clientName: string;
  uploadDate: string;
  tags: string[];
}

export default function Photos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // AI-powered photo features
  const analyzePhotos = () => {
    // AI features:
    // 1. Auto face detection and recognition
    // 2. Scene analysis and tagging
    // 3. Quality assessment
    // 4. Style consistency check
    toast({
      title: "AI Analysis",
      description: "Analyzing photos for enhanced organization...",
    });
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const mockData: Photo[] = [
          {
            id: "1",
            url: "/sample-1.jpg",
            albumName: "Summer Wedding 2025",
            clientName: "Alice & Bob",
            uploadDate: "2025-06-15",
            tags: ["wedding", "outdoor", "couple"]
          },
          {
            id: "2",
            url: "/sample-2.jpg",
            albumName: "Corporate Event",
            clientName: "Tech Corp",
            uploadDate: "2025-07-01",
            tags: ["corporate", "indoor", "group"]
          }
        ];
        setPhotos(mockData);
      } catch (error) {
        toast({
          title: "Error fetching photos",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <DashboardShell
      title="Photo Management"
      description="Upload, organize, and enhance your photos"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search photos..." className="pl-8 max-w-sm" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={analyzePhotos}>
              <Filter className="mr-2 h-4 w-4" />
              AI Analyze
            </Button>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Photos
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <div className="aspect-square relative group">
                <img
                  src={photo.url}
                  alt={`Photo from ${photo.albumName}`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <Button size="sm" variant="secondary">
                    View
                  </Button>
                  <Button size="sm" variant="secondary">
                    Edit
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium truncate">{photo.albumName}</h3>
                <p className="text-sm text-muted-foreground">{photo.clientName}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {photo.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {photos.length === 0 && !loading && (
          <div className="text-center py-10">
            <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No photos uploaded</h3>
            <p className="text-sm text-muted-foreground">
              Start by uploading some photos to your collection
            </p>
            <Button className="mt-4">
              <Upload className="mr-2 h-4 w-4" />
              Upload Photos
            </Button>
          </div>
        )}
        </div>
      </DashboardShell>
    );
  }