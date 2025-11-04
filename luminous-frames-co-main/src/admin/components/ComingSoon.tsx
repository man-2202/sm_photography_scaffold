import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
}

const ComingSoon = ({ title, description }: ComingSoonProps) => {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <h1 className="text-4xl font-serif font-bold tracking-tight">{title}</h1>
      </div>
      
      <Card className="border-2 border-dashed bg-gradient-to-br from-accent/5 to-transparent">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Coming Soon</CardTitle>
          <CardDescription className="text-base">
            {description || "This feature is currently under development and will be available soon."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 pb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowRight className="h-4 w-4" />
            <span>We're working hard to bring you this feature</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoon;