import { DashboardShell } from "../components/DashboardShell";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Mail } from "lucide-react";
import { useState } from "react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  date: string;
  status: "new" | "read" | "replied" | "archived";
}

export default function Inquiries() {
  const [inquiries] = useState<Inquiry[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      subject: "Wedding Photography Package",
      date: "2025-10-30",
      status: "new"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Portrait Session Inquiry",
      date: "2025-10-29",
      status: "replied"
    }
  ]);

  return (
    <DashboardShell
      title="Inquiries"
      description="Manage and respond to client inquiries"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search inquiries..." className="pl-8 max-w-sm" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="font-medium">{inquiry.name}</TableCell>
                  <TableCell>{inquiry.email}</TableCell>
                  <TableCell>{inquiry.subject}</TableCell>
                  <TableCell>{new Date(inquiry.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        inquiry.status === "new"
                          ? "default"
                          : inquiry.status === "replied"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {inquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardShell>
  );
}