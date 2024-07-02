import { Link, useParams } from "react-router-dom";
import { useCost } from "../../contexts/cost";

export function CostWiringBusbarAndIdentification() {
    const { data } = useCost()
    const { id } = useParams<{ id: string }>()

    console.log(data)
    
    return (
        <div>
            <h1>CostWiringBusbarAndIdentification</h1>
            <Link to={`/cost/${id}/cost-accessories-and-options`}>Proximo</Link>
        </div>
    );
}