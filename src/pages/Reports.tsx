
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  Download, 
  Share, 
  FileText, 
  Calendar, 
  Clock 
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  date: string;
  type: string;
}

const Reports: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  // Mock reports - would come from API in real app
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'Monthly Health Summary',
      date: 'March 15, 2025',
      type: 'Summary'
    },
    {
      id: '2',
      title: 'Sleep Patterns Analysis',
      date: 'February 27, 2025',
      type: 'Sleep'
    }
  ]);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      
      const newReport = {
        id: String(reports.length + 1),
        title: 'Health Status Report',
        date: 'April 6, 2025',
        type: 'Status'
      };
      
      setReports([newReport, ...reports]);
      
      toast({
        title: 'Report generated',
        description: 'Your health report has been created successfully.',
      });
    }, 2000);
  };

  const handleDownload = (id: string) => {
    toast({
      title: 'Download started',
      description: 'Your report is being downloaded.',
    });
  };

  const handleShare = (id: string) => {
    toast({
      title: 'Share options',
      description: 'Options for sharing your report with healthcare providers.',
    });
  };

  return (
    <AppLayout>
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Health Reports</h1>
        <p className="text-muted-foreground">
          Generate and manage your health reports
        </p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create Report</CardTitle>
          <CardDescription>Generate a new health report</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6 bg-muted rounded-lg">
            <div className="text-center">
              <FileText className="h-12 w-12 text-carepulse-teal mx-auto mb-4" />
              <h3 className="font-medium mb-2">Comprehensive Health Report</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Generate a complete report with insights from your health data
              </p>
              <Button 
                onClick={handleGenerateReport} 
                className="bg-carepulse-teal hover:bg-carepulse-teal/90"
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Report'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Reports</CardTitle>
          <CardDescription>Previously generated health reports</CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((report) => (
                <div 
                  key={report.id} 
                  className="flex items-center justify-between p-4 bg-card rounded-lg border border-border"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-muted rounded-md">
                      <FileText className="h-5 w-5 text-carepulse-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <div className="flex text-xs text-muted-foreground mt-1 space-x-3">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {report.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {report.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(report.id)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare(report.id)}
                    >
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No reports generated yet</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Reports are stored securely and can be accessed at any time
        </CardFooter>
      </Card>
    </AppLayout>
  );
};

export default Reports;
