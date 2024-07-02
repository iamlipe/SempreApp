import { Link, useParams } from "react-router-dom";
import { useCost } from "../../contexts/cost";

export function CostBasicCharacteristics() {
    const { data } = useCost()
    const { id } = useParams<{ id: string }>()

    console.log(data)
    return (
        <div>
            <h1>CostBasicCharacteristics</h1>
            <Link to={`/cost/${id}/cost-alternating-current-input-characteristics`}>Proximo</Link>
        </div>
    );
}