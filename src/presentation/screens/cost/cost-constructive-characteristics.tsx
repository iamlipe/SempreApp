import { Link, useParams } from "react-router-dom";
import { useCost } from "../../contexts/cost";

export function CostConstructiveCharacteristics() {
    const { data } = useCost()
    const { id } = useParams<{ id: string }>()

    console.log(data)
    return (
        <div>
            <h1>CostConstructiveCharacteristics</h1>
            <Link to={`/cost/${id}/cost-wiring-busbar-and-identification`}>Proximo</Link>
        </div>
    );
}