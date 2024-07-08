import { cn } from "../utils/cn";

interface InputRadioProps {
    label: string;
    error?: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function Radio({ label, error, options, value, onChange, className }: InputRadioProps) {
    const handleClick = (optionValue: string) => {
        if (optionValue !== value) {
            onChange(optionValue);
        }
    };

    return (
        <div className="space-y-2">
            <label className="font-semibold text-slate-800">
                {label}
            </label>
            <div className="flex flex-col space-y-2">
                {options.map((option) => (
                    <div key={option.value} className={cn("flex items-center space-x-2 cursor-pointer", className)} onClick={() => handleClick(option.value)}>
                        <div className={cn("w-4 h-4 border border-slate-400 rounded-full flex items-center justify-center", option.value === value && "bg-orange-500")} />
                        <span className="text-sm font-normal text-slate-700">{option.label}</span>
                    </div>
                ))}
            </div>
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
}
