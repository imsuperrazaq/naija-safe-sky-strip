
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaseManagement from '@/components/police/CaseManagement';
import BiometricIdentification from '@/components/police/BiometricIdentification';
import ForensicAnalysis from '@/components/police/ForensicAnalysis';
import EvidenceTracking from '@/components/police/EvidenceTracking';
import { FileText, Fingerprint, Search, Package, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="bg-[#0A4336] text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-3">
              <img src="/placeholder.svg" alt="Nigeria Police Logo" className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Nigeria Police E-Solution</h1>
              <p className="text-sm opacity-80">Integrated Digital Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm hidden md:inline">Officer ID: NPF-23458</span>
            <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center">
              <span className="font-medium text-sm">JD</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <StatsCard icon={<FileText />} title="Open Cases" value="128" trend="+5%" />
          <StatsCard icon={<Fingerprint />} title="Identifications" value="432" trend="+12%" />
          <StatsCard icon={<Search />} title="Forensic Tasks" value="64" trend="-3%" />
          <StatsCard icon={<Package />} title="Evidence Items" value="957" trend="+8%" />
        </div>
        
        <Tabs defaultValue="cases" className="w-full">
          <TabsList className="mb-6 w-full justify-start overflow-x-auto">
            <TabsTrigger value="cases" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" /> Case Management
            </TabsTrigger>
            <TabsTrigger value="biometric" className="flex items-center">
              <Fingerprint className="mr-2 h-4 w-4" /> Biometric ID
            </TabsTrigger>
            <TabsTrigger value="forensic" className="flex items-center">
              <Search className="mr-2 h-4 w-4" /> Forensic Analysis
            </TabsTrigger>
            <TabsTrigger value="evidence" className="flex items-center">
              <Package className="mr-2 h-4 w-4" /> Evidence Tracking
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cases">
            <CaseManagement />
          </TabsContent>
          
          <TabsContent value="biometric">
            <BiometricIdentification />
          </TabsContent>
          
          <TabsContent value="forensic">
            <ForensicAnalysis />
          </TabsContent>
          
          <TabsContent value="evidence">
            <EvidenceTracking />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-[#0A4336] text-white py-3 px-6">
        <div className="container mx-auto text-center text-sm">
          <p>© {new Date().getFullYear()} Nigeria Police Force | Secure Digital Solution</p>
          <p className="text-xs opacity-70">Compliant with PWC Standards for Data Security & Integrity</p>
        </div>
      </footer>
    </div>
  );
};

const StatsCard = ({ icon, title, value, trend }: { icon: React.ReactNode, title: string, value: string, trend: string }) => {
  const isPositive = trend.startsWith('+');
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="bg-blue-50 p-2 rounded-md">
          {icon}
        </div>
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
      <h3 className="mt-2 text-2xl font-bold">{value}</h3>
      <p className="text-gray-500 text-sm">{title}</p>
    </div>
  );
};

export default Dashboard;
