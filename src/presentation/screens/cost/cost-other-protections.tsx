import { Link, useParams } from "react-router-dom";
import { useCost } from "../../contexts/cost";

export function CostOtherProtection() {
    const { data } = useCost()
    const { id } = useParams<{ id: string }>()

    console.log(data)
    return (
        <div>
            <h1>CostOtherProtection</h1>
            <Link to={`/cost/${id}/cost-constructive-characteristics`}>Proximo</Link>
        </div>
    );
}