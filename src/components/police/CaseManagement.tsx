
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, FileText, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Case {
  id: string;
  title: string;
  date: string;
  status: 'open' | 'closed' | 'pending' | 'investigation';
  location: string;
  officer: string;
}

const CaseManagement = () => {
  const [cases, setCases] = useState<Case[]>([
    { 
      id: "NPF-2023-001", 
      title: "Armed Robbery at First Bank", 
      date: "2023-12-10", 
      status: "open",
      location: "Lagos Central",
      officer: "Inspector Ibrahim"
    },
    { 
      id: "NPF-2023-002", 
      title: "Vehicle Theft Report", 
      date: "2023-12-08", 
      status: "investigation",
      location: "Abuja Metro",
      officer: "Sgt. Okonkwo"
    },
    { 
      id: "NPF-2023-003", 
      title: "Assault Case - Domestic", 
      date: "2023-12-01", 
      status: "pending",
      location: "Port Harcourt",
      officer: "DPO Adamu"
    },
    { 
      id: "NPF-2023-004", 
      title: "Kidnapping Investigation", 
      date: "2023-11-28", 
      status: "open",
      location: "Kaduna North",
      officer: "DSP Ojo"
    },
    { 
      id: "NPF-2023-005", 
      title: "Cybercrime Report", 
      date: "2023-11-15", 
      status: "closed",
      location: "Enugu Central",
      officer: "ASP Chukwu"
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleNewCase = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Generate new case ID
    const newId = `NPF-2023-00${cases.length + 1}`;
    
    // Create new case object
    const newCase: Case = {
      id: newId,
      title: formData.get('title') as string,
      date: new Date().toISOString().split('T')[0],
      status: 'open',
      location: formData.get('location') as string,
      officer: formData.get('officer') as string
    };
    
    // Add to cases array
    setCases([newCase, ...cases]);
    
    // Show success toast
    toast({
      title: "Case Created",
      description: `Case ID ${newId} has been successfully registered.`,
    });
    
    // Close dialog (handled by Dialog component)
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'investigation': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCases = cases.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 w-full md:max-w-sm">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search cases by ID, title or location"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" /> Filter
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" /> New Case
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register New Case</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleNewCase} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Case Title</Label>
                  <Input id="title" name="title" required placeholder="Enter case title" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Enter case details" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" required placeholder="Incident location" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="officer">Reporting Officer</Label>
                    <Input id="officer" name="officer" required placeholder="Your name" />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end space-x-2">
                  <DialogTrigger asChild>
                    <Button variant="outline" type="button">Cancel</Button>
                  </DialogTrigger>
                  <Button type="submit">Create Case</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Officer</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.length > 0 ? (
              filteredCases.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.id}</TableCell>
                  <TableCell>{c.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{c.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(c.status)} variant="outline">
                      {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{c.location}</TableCell>
                  <TableCell className="hidden md:table-cell">{c.officer}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" title="View Details">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Case Timeline">
                        <Clock className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                  No cases found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CaseManagement;
