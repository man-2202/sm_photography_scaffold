import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for now
    setTimeout(() => {
      setClients([
        { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890' },
        { _id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <Button className="ml-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search clients..." className="pl-8" />
        </div>
      </div>
      <div className="grid gap-4">
        {clients.map(client => (
          <Card key={client._id}>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {client.firstName} {client.lastName}
                </CardTitle>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <div className="text-sm text-muted-foreground">
                <p>{client.email}</p>
                {client.phone && <p>{client.phone}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {isLoading && <div className="text-center">Loading clients...</div>}
      {!isLoading && clients.length === 0 && (
        <div className="text-center text-muted-foreground">No clients found</div>
      )}
    </div>
  );
}