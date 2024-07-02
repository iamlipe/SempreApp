import { InputHTMLAttributes } from "react";
import { cn } from "../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export function Input({ label, error, className, ...rest }: InputProps) {
    return (
        <div>
            <label className="flex flex-col text-base font-semibold space-y-1">
                <span>{label}</span>
                <input className={cn("border border-slate-400 rounded-lg px-4 py-2 placeholder-slate-400 text-sm font-normal", className)} {...rest} />
            </label>

            <span className="text-sm text-red-500">{error}</span>
        </div>
    ) 
}