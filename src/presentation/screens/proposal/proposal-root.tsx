import { Outlet } from "react-router-dom";
import { ProposalProvider } from "../../contexts/proposal";

export function ProposalRoot() {
    return (
        <ProposalProvider>
            <Outlet />
        </ProposalProvider>
    )
}