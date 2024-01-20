import React from "react";

interface BadgeProps {
  children: React.ReactNode;
}

const Badge = ({ children }: BadgeProps) => {
  return (
    <span className="rounded border bg-muted px-2 text-sm font-medium text-muted-foreground">
      {children}
    </span>
  );
};

export default Badge;
