import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search, Download, Heart, Image as ImageIcon, Calendar, Camera } from "lucide-react";

interface ClientAlbum {
  id: string;
  name: string;
  description?: string;
  eventDate: string;
  coverImageUrl?: string;
  photosCount: number;
  downloadEnabled: boolean;
  isFavorited?: boolean;
}

export default function ClientAlbums() {
  const [albums, setAlbums] = useState<ClientAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const mockData: ClientAlbum[] = [
          {
            id: "1",
            name: "Summer Wedding Photos",
            description: "Your beautiful summer wedding collection",
            eventDate: "2025-06-15",
            coverImageUrl: "/src/assets/portfolio-1.jpg",
            photosCount: 450,
            downloadEnabled: true,
            isFavorited: false
          },
          {
            id: "2",
            name: "Engagement Session",
            description: "Pre-wedding photoshoot at sunset",
            eventDate: "2025-05-01",
            coverImageUrl: "/src/assets/portfolio-2.jpg",
            photosCount: 120,
            downloadEnabled: false,
            isFavorited: true
          },
          {
            id: "3",
            name: "Family Portrait Session",
            description: "Professional family photos",
            eventDate: "2025-04-20",
            coverImageUrl: "/src/assets/portfolio-3.jpg",
            photosCount: 85,
            downloadEnabled: true,
            isFavorited: false
          }
        ];
        setAlbums(mockData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load your albums",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [toast]);

  const filteredAlbums = albums.filter(album =>
    album.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadRequest = async (albumId: string) => {
    try {
      // Replace with actual API call
      // await fetch(`/api/albums/${albumId}/download-request`, { method: "POST" });
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

  const toggleFavorite = async (albumId: string) => {
    try {
      // Replace with actual API call
      // await fetch(`/api/albums/${albumId}/favorite`, { method: "POST" });
      setAlbums(albums.map(album =>
        album.id === albumId
          ? { ...album, isFavorited: !album.isFavorited }
          : album
      ));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your albums...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Professional Header Section */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
              My Albums
            </h1>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
          </div>
          <p className="text-slate-600 text-lg font-light">
            Your professional photography collections
          </p>
        </div>
      </div>

      {/* Stats & Search - Professional Cards */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Camera className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Collections</p>
              <p className="text-lg font-bold text-slate-900">
                {filteredAlbums.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <ImageIcon className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Photos</p>
              <p className="text-lg font-bold text-slate-900">
                {filteredAlbums.reduce((sum, album) => sum + album.photosCount, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Search albums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-3 bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-sm"
          />
        </div>
      </div>

      {/* Albums Grid */}
      {filteredAlbums.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium text-muted-foreground">No albums found</p>
          <p className="text-sm text-muted-foreground mt-2">
            {searchTerm ? "Try a different search term" : "Your albums will appear here"}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAlbums.map((album) => (
            <Card 
              key={album.id} 
              className="overflow-hidden group bg-white border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 rounded-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                {album.coverImageUrl ? (
                  <>
                    <img
                      src={album.coverImageUrl}
                      alt={album.name}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                    <ImageIcon className="h-16 w-16 text-slate-300 mb-2" />
                    <span className="text-slate-400 text-sm font-medium">No Cover Image</span>
                  </div>
                )}
                
                {/* Floating Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className={`h-10 w-10 backdrop-blur-md transition-all duration-200 shadow-lg ${
                      album.isFavorited 
                        ? "bg-red-500 text-white hover:bg-red-600 hover:scale-110" 
                        : "bg-white/95 hover:bg-white hover:scale-110"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(album.id);
                    }}
                  >
                    <Heart 
                      className="h-5 w-5" 
                      fill={album.isFavorited ? "currentColor" : "none"} 
                    />
                  </Button>
                </div>

                {/* Hover Overlay Info */}
                <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full">
                    <Badge className="mb-2 backdrop-blur-md bg-white/95 text-slate-900 font-semibold shadow-lg border-0">
                      <ImageIcon className="h-3.5 w-3.5 mr-1.5" />
                      {album.photosCount} photos
                    </Badge>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-4 bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {album.name}
                    </CardTitle>
                    <div className="flex items-center text-sm text-slate-600 font-medium">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      {format(new Date(album.eventDate), "MMMM d, yyyy")}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 bg-white pt-0">
                {album.description && (
                  <CardDescription className="line-clamp-2 text-sm text-slate-600 leading-relaxed">
                    {album.description}
                  </CardDescription>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button asChild className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    <Link to={`/client/albums/${album.id}`}>
                      View Album
                    </Link>
                  </Button>
                  {album.downloadEnabled && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDownloadRequest(album.id);
                      }}
                      className="flex-shrink-0 border-slate-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:scale-105"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}