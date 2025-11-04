import { useState } from "react";
import { DashboardShell } from "../components/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Plus, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Contract {
  id: string;
  clientName: string;
  type: string;
  date: string;
  status: "draft" | "sent" | "signed" | "expired";
  amount: number;
}

export default function Contracts() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // AI-powered contract features
  const generateContract = () => {
    // AI features:
    // 1. Smart template selection
    // 2. Auto-fill client details
    // 3. Dynamic pricing calculation
    // 4. Legal compliance check
    toast({
      title: "Generating Contract",
      description: "Using AI to create an optimized contract...",
    });
  };

  // Simulated contracts data
  useState(() => {
    const mockData: Contract[] = [
      {
        id: "1",
        clientName: "John & Sarah",
        type: "Wedding Photography",
        date: "2025-12-15",
        status: "signed",
        amount: 2500
      },
      {
        id: "2",
        clientName: "Corporate Events Inc",
        type: "Event Coverage",
        date: "2025-11-30",
        status: "sent",
        amount: 1800
      }
    ];
    setContracts(mockData);
    setLoading(false);
  });

  return (
    <DashboardShell
      title="Contracts Management"
      description="Manage and track all client contracts and agreements"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search contracts..." className="pl-8 max-w-sm" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Contracts</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={generateContract}>
              <Filter className="mr-2 h-4 w-4" />
              AI Generate
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Contract
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">
                  {contract.clientName}
                </TableCell>
                <TableCell>{contract.type}</TableCell>
                <TableCell>{contract.date}</TableCell>
                <TableCell>${contract.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      contract.status === "signed"
                        ? "default"
                        : contract.status === "sent"
                        ? "secondary"
                        : contract.status === "expired"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {contract.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </div>
      </DashboardShell>
    );
  }