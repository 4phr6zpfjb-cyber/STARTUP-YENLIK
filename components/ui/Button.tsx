import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const base =
  "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 disabled:opacity-50";

const sizes = {
  sm: "h-9 px-4 text-xs",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-8 text-base"
};

const variants: Record<Variant, string> = {
  primary: "bg-lavender text-white hover:bg-lavender-deep",
  secondary: "bg-petal text-white hover:bg-petal-deep",
  ghost: "bg-transparent text-text-secondary hover:text-text-primary"
};

export const Button = ({ children, variant = "primary", size = "md", href, className = "", ...rest }: ButtonProps) => {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};
