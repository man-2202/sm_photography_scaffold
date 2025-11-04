import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardShell } from "../components/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Plus, MoreVertical, Share, Trash2, Eye, Sparkles, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface AIAnalysis {
  suggestedTags: string[];
  styleConsistency: number;
  topPhotos: string[];
  colorPalette: string[];
  recommendations: string[];
}

interface Album {
  id: string;
  name: string;
  clientName: string;
  date: string;
  photosCount: number;
  status: "draft" | "shared" | "archived";
  coverImage?: string;
  aiAnalysis?: AIAnalysis;
  tags?: string[];
}

export default function Albums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredAlbums = albums
    .filter(album => 
      album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(album => statusFilter === "all" || album.status === statusFilter);

  const handleViewAlbum = (albumId: string) => {
    navigate(`/admin/albums/${albumId}`);
  };

  const handleDeleteAlbum = async (albumId: string) => {
    if (!window.confirm("Are you sure you want to delete this album?")) return;

    try {
      // Replace with actual API call
      // await fetch(`/api/albums/${albumId}`, { method: "DELETE" });
      setAlbums(albums.filter(album => album.id !== albumId));
      toast({
        title: "Album deleted",
        description: "The album has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Error deleting album",
        description: "There was a problem deleting the album",
        variant: "destructive",
      });
    }
  };

  const handleShareAlbum = async (albumId: string) => {
    try {
      // Replace with actual API call
      // await fetch(`/api/albums/${albumId}/share`, { method: "POST" });
      setAlbums(albums.map(album => 
        album.id === albumId 
          ? { ...album, status: "shared" }
          : album
      ));
      toast({
        title: "Album shared",
        description: "The album has been shared with the client",
      });
    } catch (error) {
      toast({
        title: "Error sharing album",
        description: "There was a problem sharing the album",
        variant: "destructive",
      });
    }
  };

  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  
  // AI-powered album features
  const getAIAssistance = async (albumId: string) => {
    setIsAIProcessing(true);
    setSelectedAlbumId(albumId);
    
    try {
      // Simulating AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAIAnalysis: AIAnalysis = {
        suggestedTags: ["wedding", "outdoor", "natural light", "candid", "group shots"],
        styleConsistency: 0.85,
        topPhotos: ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
        colorPalette: ["#F5E6E8", "#D5C6E0", "#AAA1C8", "#967AA1"],
        recommendations: [
          "Consider increasing exposure in indoor shots",
          "Group photos show strong composition",
          "Candid moments are well-captured",
          "Color consistency could be improved in sunset photos"
        ]
      };

      setAlbums(albums.map(album => 
        album.id === albumId
          ? { 
              ...album, 
              aiAnalysis: mockAIAnalysis,
              tags: [...(album.tags || []), ...mockAIAnalysis.suggestedTags]
            }
          : album
      ));

      toast({
        title: "AI Analysis Complete",
        description: "Photos have been analyzed and organized",
      });
    } catch (error) {
      toast({
        title: "AI Analysis Failed",
        description: "There was an error processing your photos",
        variant: "destructive",
      });
    } finally {
      setIsAIProcessing(false);
      setSelectedAlbumId(null);
    }
  };  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const mockData: Album[] = [
          {
            id: "1",
            name: "Summer Wedding 2025",
            clientName: "Alice & Bob",
            date: "2025-06-15",
            photosCount: 450,
            status: "shared"
          },
          {
            id: "2",
            name: "Corporate Event",
            clientName: "Tech Corp",
            date: "2025-07-01",
            photosCount: 200,
            status: "draft"
          }
        ];
        setAlbums(mockData);
      } catch (error) {
        toast({
          title: "Error fetching albums",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <DashboardShell
      title="Albums Management"
      description="Organize and manage your photo collections"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search albums or clients..." 
              className="pl-8 max-w-sm" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  AI Organize
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>AI Photo Analysis</DialogTitle>
                  <DialogDescription>
                    Select an album to analyze and organize using AI
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Select
                    onValueChange={(value) => setSelectedAlbumId(value)}
                    value={selectedAlbumId || undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select album to analyze" />
                    </SelectTrigger>
                    <SelectContent>
                      {albums.map((album) => (
                        <SelectItem key={album.id} value={album.id}>
                          {album.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedAlbumId && albums.find(a => a.id === selectedAlbumId)?.aiAnalysis && (
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">AI Insights</h4>
                        <div className="space-y-2">
                          <p className="text-sm">
                            Style Consistency Score: {Math.round(albums.find(a => a.id === selectedAlbumId)?.aiAnalysis?.styleConsistency! * 100)}%
                          </p>
                          <div>
                            <p className="text-sm font-medium mb-1">Suggested Tags:</p>
                            <div className="flex flex-wrap gap-1">
                              {albums.find(a => a.id === selectedAlbumId)?.aiAnalysis?.suggestedTags.map((tag) => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">Recommendations:</p>
                            <ul className="text-sm space-y-1">
                              {albums.find(a => a.id === selectedAlbumId)?.aiAnalysis?.recommendations.map((rec, i) => (
                                <li key={i}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => selectedAlbumId && getAIAssistance(selectedAlbumId)}
                    disabled={!selectedAlbumId || isAIProcessing}
                  >
                    {isAIProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Analyze Photos
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Album
            </Button>
          </div>
        </div>

        <div>
          <Select 
            defaultValue="all" 
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Albums</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="shared">Shared</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Photos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading albums...
                    </TableCell>
                  </TableRow>
                ) : filteredAlbums.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No albums found. Create your first album!
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAlbums.map((album) => (
                    <TableRow key={album.id}>
                      <TableCell className="font-medium">{album.name}</TableCell>
                      <TableCell>{album.clientName}</TableCell>
                      <TableCell>{new Date(album.date).toLocaleDateString()}</TableCell>
                      <TableCell>{album.photosCount} photos</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            album.status === "shared"
                              ? "default"
                              : album.status === "draft"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {album.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewAlbum(album.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Album
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareAlbum(album.id)}>
                              <Share className="mr-2 h-4 w-4" />
                              Share Album
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteAlbum(album.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Album
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      </DashboardShell>
    );
  }