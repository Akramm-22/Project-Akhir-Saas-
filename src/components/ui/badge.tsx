import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-slate-900 text-white": variant === "default",
          "bg-slate-100 text-slate-900": variant === "secondary",
          "border border-slate-200 text-slate-900": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
