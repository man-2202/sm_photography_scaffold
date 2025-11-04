import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BrainCircuit, Sliders, Zap } from "lucide-react";

interface AIFeatureProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  confidenceThreshold?: number;
  onThresholdChange?: (threshold: number) => void;
}

export function AIFeatureCard({
  title,
  description,
  enabled,
  onToggle,
  confidenceThreshold,
  onThresholdChange,
}: AIFeatureProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5" />
            {title}
          </span>
          <Switch checked={enabled} onCheckedChange={onToggle} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        {confidenceThreshold !== undefined && onThresholdChange && (
          <div className="space-y-2">
            <Label>Confidence Threshold ({confidenceThreshold}%)</Label>
            <Input
              type="range"
              min="0"
              max="100"
              value={confidenceThreshold}
              onChange={(e) => onThresholdChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface PerformanceMetricsProps {
  metrics: {
    responseTime: number;
    accuracy: number;
    tasksProcessed: number;
  };
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          AI Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{metrics.responseTime}ms</p>
            <p className="text-sm text-muted-foreground">Avg. Response Time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{metrics.accuracy}%</p>
            <p className="text-sm text-muted-foreground">Accuracy Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{metrics.tasksProcessed}</p>
            <p className="text-sm text-muted-foreground">Tasks Processed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface OptimizationCardProps {
  onOptimize: () => void;
  lastOptimized: Date | null;
  optimizing: boolean;
}

export function OptimizationCard({
  onOptimize,
  lastOptimized,
  optimizing,
}: OptimizationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sliders className="h-5 w-5" />
          System Optimization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {lastOptimized
              ? `Last optimized: ${lastOptimized.toLocaleDateString()}`
              : "System not yet optimized"}
          </p>
          <Button
            onClick={onOptimize}
            className="w-full"
            disabled={optimizing}
          >
            {optimizing ? "Optimizing..." : "Run Optimization"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}