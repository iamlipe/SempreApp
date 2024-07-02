import { Outlet} from "react-router-dom";
import { CostProvider } from "../../contexts/cost";

export function CostRoot() {
    return (
        <CostProvider>
            <Outlet />
        </CostProvider>
    )
}