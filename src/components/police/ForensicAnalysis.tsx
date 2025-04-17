
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Beaker, Share2, Clock, ChevronDown, Upload, FileText, 
  MicroscopeIcon, TestTube, Dna, ShieldAlert
} from 'lucide-react';

interface ForensicRequest {
  id: string;
  title: string;
  type: string;
  status: string;
  priority: string;
  submitted: string;
  completionEstimate: string;
}

const sampleRequests: ForensicRequest[] = [
  {
    id: "FOR-2023-001",
    title: "Blood Sample Analysis",
    type: "DNA",
    status: "in-progress",
    priority: "high",
    submitted: "2023-12-08",
    completionEstimate: "2023-12-15"
  },
  {
    id: "FOR-2023-002",
    title: "Bullet Casing Comparison",
    type: "Ballistics",
    status: "pending",
    priority: "medium",
    submitted: "2023-12-09",
    completionEstimate: "2023-12-18"
  },
  {
    id: "FOR-2023-003",
    title: "Digital Device Analysis",
    type: "Digital",
    status: "completed",
    priority: "medium",
    submitted: "2023-11-30",
    completionEstimate: "2023-12-07"
  },
  {
    id: "FOR-2023-004",
    title: "Fingerprint Identification",
    type: "Fingerprint",
    status: "in-progress",
    priority: "high",
    submitted: "2023-12-07",
    completionEstimate: "2023-12-14"
  },
  {
    id: "FOR-2023-005",
    title: "Document Authentication",
    type: "Document",
    status: "completed",
    priority: "low",
    submitted: "2023-12-01",
    completionEstimate: "2023-12-10"
  }
];

const ForensicAnalysis = () => {
  const [requests] = useState<ForensicRequest[]>(sampleRequests);
  const [selectedTab, setSelectedTab] = useState('requests');
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200" variant="outline">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200" variant="outline">In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200" variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200" variant="outline">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200" variant="outline">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200" variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const handleNewRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Forensic Request Submitted",
      description: "Your request has been submitted and assigned ID: FOR-2023-006",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-4 w-full md:w-auto">
              <TabsTrigger value="requests" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" /> Requests
              </TabsTrigger>
              <TabsTrigger value="new-request" className="flex items-center">
                <TestTube className="mr-2 h-4 w-4" /> New Request
              </TabsTrigger>
              <TabsTrigger value="results" className="flex items-center">
                <MicroscopeIcon className="mr-2 h-4 w-4" /> Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>Forensic Analysis Requests</CardTitle>
                  <CardDescription>
                    View and track ongoing forensic analysis requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">Priority</TableHead>
                          <TableHead className="hidden md:table-cell">Submitted</TableHead>
                          <TableHead className="hidden md:table-cell">Est. Completion</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {requests.map(request => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">{request.id}</TableCell>
                            <TableCell>{request.title}</TableCell>
                            <TableCell>{request.type}</TableCell>
                            <TableCell>{getStatusBadge(request.status)}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {getPriorityBadge(request.priority)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{request.submitted}</TableCell>
                            <TableCell className="hidden md:table-cell">{request.completionEstimate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="new-request">
              <Card>
                <CardHeader>
                  <CardTitle>New Forensic Analysis Request</CardTitle>
                  <CardDescription>
                    Submit evidence for forensic analysis and processing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNewRequest} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Request Title</label>
                        <Input placeholder="Enter a descriptive title" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Case Reference</label>
                        <Input placeholder="Related case ID" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Analysis Type</label>
                        <select className="w-full border border-input rounded-md h-10 px-3 py-2 bg-background text-sm">
                          <option value="">Select analysis type</option>
                          <option value="dna">DNA Analysis</option>
                          <option value="fingerprints">Fingerprint Analysis</option>
                          <option value="ballistics">Ballistics</option>
                          <option value="digital">Digital Forensics</option>
                          <option value="documents">Document Analysis</option>
                          <option value="toxicology">Toxicology</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Priority</label>
                        <select className="w-full border border-input rounded-md h-10 px-3 py-2 bg-background text-sm">
                          <option value="low">Low</option>
                          <option value="medium" selected>Medium</option>
                          <option value="high">High</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Evidence Description</label>
                      <Textarea 
                        placeholder="Describe the evidence being submitted for analysis" 
                        rows={4}
                        required
                      />
                    </div>

                    <div className="border border-dashed border-gray-300 rounded-lg p-4">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">
                          Upload evidence documentation and photos
                        </p>
                        <p className="text-xs text-gray-400 mb-2">
                          Supported formats: JPG, PNG, PDF (max 10MB)
                        </p>
                        <Button variant="outline" size="sm" type="button">
                          Choose Files
                        </Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" type="button">Cancel</Button>
                        <Button type="submit">Submit Request</Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle>Forensic Results</CardTitle>
                  <CardDescription>
                    View completed analysis results and reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MicroscopeIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No results available</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Please select a completed analysis to view its results
                    </p>
                    <Button variant="outline">Select Analysis</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Beaker className="mr-2 h-4 w-4" /> Lab Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>DNA Analysis Lab</span>
                  <span className="text-green-600 font-medium">76% Available</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Fingerprint Analysis</span>
                  <span className="text-amber-600 font-medium">42% Available</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Ballistics Lab</span>
                  <span className="text-green-600 font-medium">89% Available</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Digital Forensics</span>
                  <span className="text-red-600 font-medium">12% Available</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Clock className="mr-2 h-4 w-4" /> Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                    <Dna className="h-3 w-3 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">DNA Analysis Completed</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-amber-100 p-1 rounded-full mt-0.5">
                    <ShieldAlert className="h-3 w-3 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">New High Priority Request</p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 p-1 rounded-full mt-0.5">
                    <Share2 className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Report Shared with Case Team</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-purple-100 p-1 rounded-full mt-0.5">
                    <TestTube className="h-3 w-3 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">New Sample Received</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full">View All Activity</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForensicAnalysis;
