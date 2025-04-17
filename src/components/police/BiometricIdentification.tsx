
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Fingerprint, Camera, User, Upload, FileSearch, CheckCircle2, AlertCircle } from "lucide-react";

const BiometricIdentification = () => {
  const [activeTab, setActiveTab] = useState('capture');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<'match' | 'no-match' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleCaptureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate biometric processing
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          
          // Randomly determine match (for demo purposes)
          const hasMatch = Math.random() > 0.5;
          setScanResult(hasMatch ? 'match' : 'no-match');
          
          toast({
            title: hasMatch ? "Match Found" : "No Match Found",
            description: hasMatch 
              ? "The biometric data matches a record in the database." 
              : "No matching records found in the database.",
          });
          
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };

  const resetScan = () => {
    setScanResult(null);
    setScanProgress(0);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Biometric Identification</CardTitle>
            <CardDescription>Capture or search biometric data to identify individuals in the database</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="capture">
                  <Camera className="mr-2 h-4 w-4" /> Capture
                </TabsTrigger>
                <TabsTrigger value="search">
                  <FileSearch className="mr-2 h-4 w-4" /> Search
                </TabsTrigger>
                <TabsTrigger value="upload">
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="capture" className="space-y-4">
                <form onSubmit={handleCaptureSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-100 border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center aspect-square">
                        {isProcessing ? (
                          <div className="text-center space-y-3">
                            <div className="rounded-full bg-blue-100 p-3 mx-auto">
                              <Fingerprint className="h-12 w-12 text-blue-600 animate-pulse" />
                            </div>
                            <div className="space-y-2">
                              <p className="font-medium">Processing Biometrics</p>
                              <Progress value={scanProgress} />
                              <p className="text-sm text-gray-500">Please wait...</p>
                            </div>
                          </div>
                        ) : scanResult ? (
                          <div className="text-center space-y-3">
                            {scanResult === 'match' ? (
                              <>
                                <div className="rounded-full bg-green-100 p-3 mx-auto">
                                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                                </div>
                                <p className="font-medium text-green-700">Match Found</p>
                              </>
                            ) : (
                              <>
                                <div className="rounded-full bg-amber-100 p-3 mx-auto">
                                  <AlertCircle className="h-12 w-12 text-amber-600" />
                                </div>
                                <p className="font-medium text-amber-700">No Match Found</p>
                              </>
                            )}
                            <Button variant="outline" size="sm" onClick={resetScan}>
                              Reset
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Fingerprint className="h-16 w-16 text-gray-400 mb-4" />
                            <p className="text-center text-gray-500 text-sm">
                              Connect scanner device and capture fingerprints
                            </p>
                          </>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Select Capture Type</h4>
                        <ToggleGroup type="single" defaultValue="fingerprint">
                          <ToggleGroupItem value="fingerprint">
                            <Fingerprint className="h-4 w-4 mr-1" /> Fingerprint
                          </ToggleGroupItem>
                          <ToggleGroupItem value="facial">
                            <User className="h-4 w-4 mr-1" /> Facial
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Individual Details</label>
                        <Input placeholder="Full Name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">ID Number (if available)</label>
                        <Input placeholder="National ID, Driver's License, etc." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Case Reference</label>
                        <Input placeholder="Case Number (if applicable)" />
                      </div>
                      
                      {scanResult === 'match' && (
                        <Alert className="bg-green-50 border-green-200">
                          <AlertTitle className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2" /> Match Found
                          </AlertTitle>
                          <AlertDescription>
                            <p>Match found with ID: <strong>NGP-67834-A</strong></p>
                            <p className="text-sm mt-1">Adamu Mohammed, Age 34</p>
                            <p className="text-sm">Previous Case: NPF-2022-089</p>
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                  
                  {!scanResult && (
                    <Button className="mt-6" type="submit" disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Capture & Identify"}
                    </Button>
                  )}
                </form>
              </TabsContent>
              
              <TabsContent value="search">
                <div className="space-y-4">
                  <Input placeholder="Search by ID, name or case reference" />
                  <p className="text-sm text-gray-500">Enter search criteria to find individuals in the database</p>
                </div>
              </TabsContent>
              
              <TabsContent value="upload">
                <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-medium">Upload Biometric Data</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Drag and drop files or click to browse
                  </p>
                  <Button variant="outline">Select Files</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Identifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  { name: "Chukwu Emmanuel", time: "10:32 AM", officer: "ASP Ojo" },
                  { name: "Fatima Ibrahim", time: "09:15 AM", officer: "Insp. James" },
                  { name: "Okonkwo Daniel", time: "Yesterday", officer: "Cpl. Adewale" },
                  { name: "Amina Yusuf", time: "Yesterday", officer: "Sgt. Chukwu" }
                ].map((item, i) => (
                  <li key={i} className="flex justify-between items-center p-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">by {item.officer}</p>
                    </div>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full">View All Records</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Scanner Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Fingerprint Scanner</span>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Facial Recognition</span>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Database Connection</span>
                  <span className="text-sm font-medium text-green-600">Connected</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BiometricIdentification;
