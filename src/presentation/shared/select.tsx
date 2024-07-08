import { SelectHTMLAttributes } from "react";
import { cn } from "../utils/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
}

export function Select({ label, error, className, children, value, ...rest }: SelectProps) {
    return (
        <div>
            <label className="flex flex-col text-base font-semibold space-y-1">
                {label ? <span className="font-semibold text-slate-800">{label}</span> : null} 

                <select className={cn("border border-slate-400 rounded-lg px-4 py-2 placeholder-slate-400 text-sm font-normal", className, {"text-slate-400": value === ""})} {...rest}>
                    {children}
                </select>
            </label>
            
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
}
