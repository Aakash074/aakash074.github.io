import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.02] active:scale-[0.98] shadow-sm",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-accent",
  outline:
    "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
};

const sizes = {
  sm: "px-3.5 py-2 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-full",
  lg: "px-6 py-3 text-base rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
