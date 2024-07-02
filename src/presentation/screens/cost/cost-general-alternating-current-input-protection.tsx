import { Link, useParams } from "react-router-dom";
import { useCost } from "../../contexts/cost";

export function CostGeneralAlernatingCurrentInputProtection() {
    const { data } = useCost()
    const { id } = useParams<{ id: string }>()

    console.log(data)
    return (
        <div>
            <h1>CostGeneralAlernatingCurrentInputProtection</h1>
            <Link to={`/cost/${id}/cost-battery-protection`}>Proximo</Link>
        </div>
    );
}