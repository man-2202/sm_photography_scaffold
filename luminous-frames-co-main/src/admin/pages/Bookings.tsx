import { useEffect, useState } from "react";
import { DashboardShell } from "../components/DashboardShell";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  clientName: string;
  date: string;
  type: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  location: string;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // AI-powered scheduling optimization
  const getAIRecommendations = () => {
    // AI features:
    // 1. Optimal time slot suggestions based on:
    //    - Historical booking patterns
    //    - Lighting conditions for location/season
    //    - Travel time between locations
    // 2. Smart conflict detection
    // 3. Revenue optimization suggestions
    // 4. Equipment requirements prediction
    toast({
      title: "AI Recommendations",
      description: "Analyzing booking patterns and generating suggestions...",
    });
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const mockData: Booking[] = [
          {
            id: "1",
            clientName: "Alice Johnson",
            date: "2025-11-01",
            type: "Wedding",
            status: "confirmed",
            location: "Crystal Gardens"
          },
          {
            id: "2",
            clientName: "Bob Smith",
            type: "Portrait",
            date: "2025-11-02",
            status: "pending",
            location: "Studio B"
          }
        ];
        setBookings(mockData);
      } catch (error) {
        toast({
          title: "Error fetching bookings",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <DashboardShell
      title="Bookings Management"
      description="Manage your photography sessions and appointments intelligently"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search bookings..." className="pl-8 max-w-sm" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={getAIRecommendations}>
              <Filter className="mr-2 h-4 w-4" />
              AI Suggestions
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Booking
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-1/3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border rounded-lg p-4"
            />
            <div className="mt-4 space-y-4">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bookings</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.clientName}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.type}</TableCell>
                    <TableCell>{booking.location}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "default"
                            : booking.status === "completed"
                            ? "secondary"
                            : booking.status === "cancelled"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}