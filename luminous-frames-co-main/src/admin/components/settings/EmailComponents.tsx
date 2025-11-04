import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Mail, AlertTriangle } from "lucide-react";

interface EmailTestProps {
  template: string;
  onTest: () => Promise<void>;
}

export function EmailTest({ template, onTest }: EmailTestProps) {
  const [testing, setTesting] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleTest = async () => {
    setTesting(true);
    try {
      await onTest();
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Test Email Template
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="email"
              placeholder="Enter test email address"
              className="flex-1"
            />
            <Button onClick={handleTest} disabled={testing}>
              {testing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                "Send Test"
              )}
            </Button>
          </div>
          {success !== null && (
            <Alert variant={success ? "default" : "destructive"}>
              <AlertTitle>
                {success ? "Test Successful" : "Test Failed"}
              </AlertTitle>
              <AlertDescription>
                {success
                  ? "Test email was sent successfully."
                  : "Failed to send test email. Please try again."}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface TemplateVariablesProps {
  variables: string[];
}

export function TemplateVariables({ variables }: TemplateVariablesProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm">Available Variables</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {variables.map((variable) => (
            <code
              key={variable}
              className="px-2 py-1 bg-muted rounded text-sm"
            >
              {variable}
            </code>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface ValidationWarningProps {
  warnings: string[];
}

export function ValidationWarning({ warnings }: ValidationWarningProps) {
  if (warnings.length === 0) return null;

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Template Warnings</AlertTitle>
      <AlertDescription>
        <ul className="list-disc pl-4 space-y-1">
          {warnings.map((warning, index) => (
            <li key={index}>{warning}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}