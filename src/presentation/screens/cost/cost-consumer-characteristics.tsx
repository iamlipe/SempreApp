import { Link, useParams } from "react-router-dom";
import { useCost } from "../../contexts/cost";

export function CostConsumerCharacteristics() {
    const { data } = useCost()
    const { id } = useParams<{ id: string }>()

    console.log(data)
    return (
        <div>
            <h1>CostConsumerCharacteristics</h1>
            <Link to={`/cost/${id}/cost-distortion-and-trigger`}>Proximo</Link>
        </div>
    );
}