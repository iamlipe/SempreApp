import { GripHorizontal } from "lucide-react";
import { ReactElement, useState } from "react";

interface ItemListProps {
    title: string;
    description: string;
    options?: { text: string; icon: ReactElement, onPress: () => void }[]
}

export function ItemList({ description, title, options }: ItemListProps) {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex border-b border-slate-800 px-4 py-2 justify-between items-center">
            <div className="space-y-1">
                <p className="font-bold text-slate-800 capitalize">{title}</p>
                <p className="font-normal text-slate-600">{description}</p>
            </div>

            {
                options ?
                    <div className="cursor-pointer" onClick={() => setOpen(!open)}>
                        <GripHorizontal />

                        {open ?   
                                <div className="absolute right-8 flex flex-col items-start bg-white border rounded-md border-slate-200 p-4 space-y-3">
                                    {options.map((o) => (
                                        <div key={o.text} className="flex w-full space-x-3 hover:text-orange-500" onClick={o.onPress}>
                                            <p className="flex flex-1 w-full text-sm font-medium text-slate-800 hover:text-orange-500" >{o.text}</p>
                                            <div className="self-end">
                                                {o.icon}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            : <></>
                        }
                    </div>
                : null
            }
        </div>
    );
}