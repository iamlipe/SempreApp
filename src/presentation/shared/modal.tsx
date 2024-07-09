import React, { useState } from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "../utils/cn";
import { Fullscreen, X } from "lucide-react";

interface ModalProps extends ButtonProps {
    icon?: any
}

export const Modal: React.FC<ModalProps> = ({ children, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Button variant="outline" type="button" onClick={() => setIsOpen(true)} >
                <Fullscreen />
            </Button>

            <div onClick={() => setIsOpen(false)} className={cn("fixed inset-0 items-center justify-center bg-black bg-opacity-50", { "flex": isOpen, "hidden": !isOpen })}>
                <div className="bg-white rounded-lg shadow-lg space-y-8 px-4 pt-4 pb-8">
                    <div className="flex items-center justify-end">
                        <button className="text-orange-500" {...rest} onClick={() => setIsOpen(false)}>
                            <X/>
                        </button>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
};