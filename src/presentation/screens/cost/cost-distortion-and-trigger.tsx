import { Link, useParams } from "react-router-dom";
import { useCost } from "../../contexts/cost";

export function CostDistortionAndTrigger() {
    const { data } = useCost()
    const { id } = useParams<{ id: string }>()

    console.log(data)
    return (
        <div>
            <h1>CostDistortionAndTrigger</h1>
            <Link to={`/cost/${id}/cost-general-alternating-current-input-protection`}>Proximo</Link>
        </div>
    );
}