import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.ComponentProps<"div"> {
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div className={cn(`bg-white rounded-2xl shadow p-4`, className)} {...props}>
      {children}
    </div>
  );
}

interface CardContentProps extends React.ComponentProps<"div"> {
  className?: string;
}

export function CardContent({ children, className = "", ...props }: CardContentProps) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}