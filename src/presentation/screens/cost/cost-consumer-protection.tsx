import { Link, useParams } from "react-router-dom";
import { useCost } from "../../contexts/cost";

export function CostConsumerProtection() {
    const { data } = useCost()
    const { id } = useParams<{ id: string }>()

    console.log(data)
    return (
        <div>
            <h1>CostConsumerProtection</h1>
            <Link to={`/cost/${id}/cost-other-protections`}>Proximo</Link>
        </div>
    );
}