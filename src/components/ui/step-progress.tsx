// Render N passive progress dots
export function PassiveProgressDots({ count, className }: { count: number; className?: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i+"flavar"} className={cn("m-auto text-center h-1 w-1 rounded-full bg-white block", className)} />
      ))}
    </>
  );
}
// Thick white bar for active progress
export function ActiveProgress({ className }: { className?: string }) {
  return (
    <div className={cn("h-2 w-14 rounded-sm bg-white", className)} />
  );
}

// White dot for passive progress
export function PassiveProgress({ className }: { className?: string }) {
  return (
    <div className="flex gap-1">
        <PassiveProgressDots count={5} className={className} />
    </div>
  );
}
import * as React from "react";
import { cn } from "@/lib/utils";

interface StepProgressProps {
  steps: number;
  value: number; 
  className?: string;
}

export function StepProgress({ steps, value, className }: StepProgressProps) {
  return (
    <div className={cn("m-auto relative w-full flex items-center gap-4 justify-between", className)}>
      {Array.from({ length: steps }).map((_, i) =>
        i < value ? (
          <ActiveProgress key={i} />
        ) : (
          <PassiveProgress key={i} />
        )
      )}
    </div>
  );
}