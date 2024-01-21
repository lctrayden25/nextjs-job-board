import React, { ButtonHTMLAttributes } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

const LoadingButton = ({ children, loading, ...props }: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={props?.disabled || loading}>
      <span className="flex items-center justify-center gap-1">
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </span>
    </Button>
  );
};

export default LoadingButton;
