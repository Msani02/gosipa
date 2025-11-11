import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "outline";
  className?: string;
}

export function Button({ children, className = "", variant = "default", ...props }: ButtonProps) {
  const base = "px-4 py-2 rounded-lg text-white font-medium transition";
  const variants: Record<string, string> = {
    default: "bg-blue-600 hover:bg-blue-700",
    outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}