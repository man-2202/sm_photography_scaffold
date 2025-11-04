import { useState } from "react";
import { DashboardShell } from "../components/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BrainCircuit,
  Mail,
  Settings2,
  Sliders,
  CloudCog,
  Shield,
  Paintbrush,
  Globe,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AISettings {
  autoTagging: boolean;
  styleAnalysis: boolean;
  facialRecognition: boolean;
  smartScheduling: boolean;
  qualityCheck: boolean;
}

interface EmailSettings {
  bookingConfirmation: string;
  paymentReminder: string;
  albumDelivery: string;
  fromEmail: string;
  replyTo: string;
}

interface GeneralSettings {
  businessName: string;
  timezone: string;
  currency: string;
  language: string;
  dateFormat: string;
}

export default function Settings() {
  const { toast } = useToast();
  const [aiSettings, setAiSettings] = useState<AISettings>({
    autoTagging: true,
    styleAnalysis: true,
    facialRecognition: false,
    smartScheduling: true,
    qualityCheck: true,
  });

  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    bookingConfirmation: "Thank you for booking with us...",
    paymentReminder: "This is a friendly payment reminder...",
    albumDelivery: "Your photos are ready...",
    fromEmail: "studio@example.com",
    replyTo: "contact@example.com",
  });

  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    businessName: "Studio Name",
    timezone: "UTC",
    currency: "USD",
    language: "en",
    dateFormat: "MM/DD/YYYY",
  });

  // AI-powered settings optimization
  const optimizeSettings = () => {
    toast({
      title: "AI Optimization",
      description: "Analyzing usage patterns and optimizing settings...",
    });
    // AI would:
    // 1. Analyze system performance
    // 2. Suggest optimal configurations
    // 3. Adjust resource allocation
    // 4. Optimize workflow settings
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been successfully saved.",
    });
  };

  return (
    <DashboardShell
      title="System Settings"
      description="Configure your photography business settings and preferences"
    >
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ai">AI & Automation</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input
                  value={generalSettings.businessName}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      businessName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select
                    value={generalSettings.timezone}
                    onValueChange={(value) =>
                      setGeneralSettings({ ...generalSettings, timezone: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select
                    value={generalSettings.currency}
                    onValueChange={(value) =>
                      setGeneralSettings({ ...generalSettings, currency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5" />
                AI & Automation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Photo Tagging</Label>
                  <p className="text-sm text-muted-foreground">
                    Use AI to automatically tag and categorize photos
                  </p>
                </div>
                <Switch
                  checked={aiSettings.autoTagging}
                  onCheckedChange={(checked) =>
                    setAiSettings({ ...aiSettings, autoTagging: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Style Analysis</Label>
                  <p className="text-sm text-muted-foreground">
                    AI-powered photo style consistency checking
                  </p>
                </div>
                <Switch
                  checked={aiSettings.styleAnalysis}
                  onCheckedChange={(checked) =>
                    setAiSettings({ ...aiSettings, styleAnalysis: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Smart Scheduling</Label>
                  <p className="text-sm text-muted-foreground">
                    AI optimization for booking and scheduling
                  </p>
                </div>
                <Switch
                  checked={aiSettings.smartScheduling}
                  onCheckedChange={(checked) =>
                    setAiSettings({ ...aiSettings, smartScheduling: checked })
                  }
                />
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={optimizeSettings}
              >
                <BrainCircuit className="mr-2 h-4 w-4" />
                Run AI Optimization
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Booking Confirmation Template</Label>
                <Textarea
                  value={emailSettings.bookingConfirmation}
                  onChange={(e) =>
                    setEmailSettings({
                      ...emailSettings,
                      bookingConfirmation: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Payment Reminder Template</Label>
                <Textarea
                  value={emailSettings.paymentReminder}
                  onChange={(e) =>
                    setEmailSettings({
                      ...emailSettings,
                      paymentReminder: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From Email</Label>
                  <Input
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        fromEmail: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Reply-To Email</Label>
                  <Input
                    type="email"
                    value={emailSettings.replyTo}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        replyTo: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudCog className="h-5 w-5" />
                  Storage Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label>Storage Provider</Label>
                  <Select defaultValue="aws">
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aws">Amazon S3</SelectItem>
                      <SelectItem value="gcp">Google Cloud</SelectItem>
                      <SelectItem value="azure">Azure Blob</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Two-Factor Authentication</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Password Expiry</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Paintbrush className="h-5 w-5" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Localization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} className="w-[200px]">
            Save Changes
          </Button>
        </div>
      </DashboardShell>
    );
  }