import React, { ButtonHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

const buttonVarients = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-[6px]',
  {
    variants: {
      variant: {
        default: 'bg-orange-500 text-white hover:bg-orange-400',
        outline: 'bg-transparent border border-orange-500 text-orange-500 hover:text-orange-400 hover:border-orange-400',
        ghost: 'bg-transparent text-orange-500 hover:text-orange-400 underline'
      },
    },
    defaultVariants: {
      variant: "default",
    }
  }
) 

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVarients> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ className, children, variant, isLoading, ...rest }) => {
  return (
    <button className={cn(buttonVarients({variant, className}))} disabled={isLoading} {...rest}>
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}

