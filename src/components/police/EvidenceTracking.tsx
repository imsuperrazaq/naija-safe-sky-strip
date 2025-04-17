
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, Search, QrCode, History, CheckCircle, UserPlus, 
  ArrowRight, AlertCircle, Camera, Printer 
} from "lucide-react";

interface Evidence {
  id: string;
  description: string;
  type: string;
  caseId: string;
  location: string;
  status: 'secured' | 'in-analysis' | 'in-transit' | 'released';
  officer: string;
  dateCollected: string;
  chain: {
    timestamp: string;
    action: string;
    officer: string;
    notes?: string;
  }[];
}

const sampleEvidence: Evidence[] = [
  {
    id: "EV-2023-001",
    description: "9mm Handgun",
    type: "Weapon",
    caseId: "NPF-2023-001",
    location: "Locker A-12",
    status: "secured",
    officer: "Insp. Mohammed",
    dateCollected: "2023-12-10",
    chain: [
      { timestamp: "2023-12-10 14:30", action: "Collected", officer: "Insp. Mohammed", notes: "Found at crime scene" },
      { timestamp: "2023-12-10 16:45", action: "Logged", officer: "Sgt. Adewale" },
      { timestamp: "2023-12-11 09:15", action: "Stored", officer: "Evidence Clerk Okonkwo", notes: "Placed in Locker A-12" }
    ]
  },
  {
    id: "EV-2023-002",
    description: "Blood-stained Clothing",
    type: "Biological",
    caseId: "NPF-2023-001",
    location: "Forensic Lab",
    status: "in-analysis",
    officer: "Cpl. Chukwu",
    dateCollected: "2023-12-10",
    chain: [
      { timestamp: "2023-12-10 14:40", action: "Collected", officer: "Cpl. Chukwu" },
      { timestamp: "2023-12-10 17:30", action: "Logged", officer: "Sgt. Adewale" },
      { timestamp: "2023-12-12 11:00", action: "Transferred", officer: "Evidence Clerk Okonkwo", notes: "Sent to forensic lab" }
    ]
  },
  {
    id: "EV-2023-003",
    description: "Mobile Phone",
    type: "Digital",
    caseId: "NPF-2023-002",
    location: "Digital Lab",
    status: "in-analysis",
    officer: "ASP Ojo",
    dateCollected: "2023-12-08",
    chain: [
      { timestamp: "2023-12-08 10:20", action: "Collected", officer: "ASP Ojo", notes: "Seized from suspect" },
      { timestamp: "2023-12-08 12:15", action: "Logged", officer: "Cpl. Amina" },
      { timestamp: "2023-12-09 09:30", action: "Transferred", officer: "Evidence Clerk Okonkwo", notes: "Sent to digital forensics" }
    ]
  },
  {
    id: "EV-2023-004",
    description: "Surveillance Video",
    type: "Digital",
    caseId: "NPF-2023-003",
    location: "Evidence Storage",
    status: "secured",
    officer: "Sgt. Ibrahim",
    dateCollected: "2023-12-01",
    chain: [
      { timestamp: "2023-12-01 16:00", action: "Collected", officer: "Sgt. Ibrahim", notes: "Bank CCTV footage" },
      { timestamp: "2023-12-01 17:45", action: "Logged", officer: "ASP Nneka" },
      { timestamp: "2023-12-02 09:00", action: "Stored", officer: "Evidence Clerk James", notes: "Digital copy secured" }
    ]
  },
  {
    id: "EV-2023-005",
    description: "Fingerprint Samples",
    type: "Biological",
    caseId: "NPF-2023-004",
    location: "In Transit",
    status: "in-transit",
    officer: "Cpl. Adamu",
    dateCollected: "2023-11-28",
    chain: [
      { timestamp: "2023-11-28 11:30", action: "Collected", officer: "Cpl. Adamu" },
      { timestamp: "2023-11-28 14:20", action: "Logged", officer: "Insp. Taiwo" },
      { timestamp: "2023-11-29 10:00", action: "Stored", officer: "Evidence Clerk Okonkwo" },
      { timestamp: "2023-12-12 08:45", action: "In Transit", officer: "Transport Officer Bello", notes: "En route to regional lab" }
    ]
  }
];

const EvidenceTracking = () => {
  const [evidence] = useState<Evidence[]>(sampleEvidence);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'secured':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200" variant="outline">Secured</Badge>;
      case 'in-analysis':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200" variant="outline">In Analysis</Badge>;
      case 'in-transit':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200" variant="outline">In Transit</Badge>;
      case 'released':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200" variant="outline">Released</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredEvidence = evidence.filter(item => 
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.caseId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddChainOfCustody = () => {
    toast({
      title: "Chain of Custody Updated",
      description: "New entry has been added to the evidence chain of custody",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Evidence Tracking</CardTitle>
                  <CardDescription>Track and manage evidence chain of custody</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <QrCode className="mr-2 h-4 w-4" /> Scan
                  </Button>
                  <Button size="sm">
                    <Package className="mr-2 h-4 w-4" /> Add Evidence
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Search evidence by ID, description or case" 
                      className="pl-8" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm w-full md:w-40">
                    <option value="all">All Types</option>
                    <option value="weapon">Weapon</option>
                    <option value="biological">Biological</option>
                    <option value="digital">Digital</option>
                    <option value="document">Document</option>
                    <option value="currency">Currency</option>
                  </select>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="hidden md:table-cell">Case ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Location</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEvidence.length > 0 ? (
                        filteredEvidence.map(item => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>
                              {item.description}
                              <div className="md:hidden text-xs text-gray-500">
                                {item.caseId} • {item.location}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{item.caseId}</TableCell>
                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                            <TableCell className="hidden md:table-cell">{item.location}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8">
                                    <History className="h-4 w-4 mr-1" /> History
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Evidence Chain of Custody</DialogTitle>
                                  </DialogHeader>
                                  <div className="mt-4 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="text-sm font-medium mb-2">Evidence Details</h4>
                                        <div className="bg-muted rounded-md p-3 text-sm">
                                          <div className="flex justify-between mb-1">
                                            <span className="font-medium">ID:</span>
                                            <span>{item.id}</span>
                                          </div>
                                          <div className="flex justify-between mb-1">
                                            <span className="font-medium">Type:</span>
                                            <span>{item.type}</span>
                                          </div>
                                          <div className="flex justify-between mb-1">
                                            <span className="font-medium">Case:</span>
                                            <span>{item.caseId}</span>
                                          </div>
                                          <div className="flex justify-between mb-1">
                                            <span className="font-medium">Collected:</span>
                                            <span>{item.dateCollected}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="font-medium">Status:</span>
                                            <span>{item.status}</span>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <h4 className="text-sm font-medium mb-2">Current Location</h4>
                                        <div className="bg-muted rounded-md p-3 text-sm">
                                          <p className="font-medium">{item.location}</p>
                                          <p className="text-xs text-gray-500 mt-1">
                                            Last updated: {item.chain[item.chain.length - 1].timestamp}
                                          </p>
                                          
                                          <div className="mt-4 flex gap-2">
                                            <Button size="sm" variant="outline" className="w-full">
                                              <Printer className="h-4 w-4 mr-1" /> Print Label
                                            </Button>
                                            <Button size="sm" variant="outline" className="w-full">
                                              <QrCode className="h-4 w-4 mr-1" /> QR Code
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <h4 className="text-sm font-medium mb-2">Chain of Custody</h4>
                                      <div className="border rounded-md">
                                        <div className="relative pl-8 pr-4 py-2 border-b">
                                          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>
                                          {item.chain.map((entry, index) => (
                                            <div key={index} className="mb-6 last:mb-0 relative">
                                              <div className="absolute -left-6 mt-1.5 w-3 h-3 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                                              <p className="text-xs text-gray-500">{entry.timestamp}</p>
                                              <p className="font-medium">{entry.action}</p>
                                              <p className="text-sm">{entry.officer}</p>
                                              {entry.notes && (
                                                <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                        <div className="p-3">
                                          <h4 className="text-sm font-medium mb-2">Add New Entry</h4>
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                            <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                                              <option value="">Select action</option>
                                              <option>Transferred</option>
                                              <option>Examined</option>
                                              <option>Returned</option>
                                              <option>Stored</option>
                                            </select>
                                            <Input 
                                              className="h-9 text-sm"
                                              placeholder="Officer name" 
                                            />
                                            <Button size="sm" className="h-9" onClick={handleAddChainOfCustody}>
                                              Add Entry
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                            No evidence found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Evidence Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">38 Secured Items</p>
                  <p className="text-sm text-gray-500">Properly stored and logged</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">12 In Analysis</p>
                  <p className="text-sm text-gray-500">Currently with forensic teams</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <ArrowRight className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">5 In Transit</p>
                  <p className="text-sm text-gray-500">Moving between locations</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">2 Need Attention</p>
                  <p className="text-sm text-gray-500">Pending verification</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Camera className="mr-2 h-4 w-4" /> Capture Evidence Photo
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <QrCode className="mr-2 h-4 w-4" /> Generate Evidence Tag
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" /> Advanced Search
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <UserPlus className="mr-2 h-4 w-4" /> Add Authorized Personnel
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Case Evidence Lookup</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {['NPF-2023-001', 'NPF-2023-002', 'NPF-2023-003'].map((caseId, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger>{caseId}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        {evidence
                          .filter(e => e.caseId === caseId)
                          .map(e => (
                            <li key={e.id} className="flex justify-between items-center p-1">
                              <span>{e.description}</span>
                              <span>{getStatusBadge(e.status)}</span>
                            </li>
                          ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EvidenceTracking;
