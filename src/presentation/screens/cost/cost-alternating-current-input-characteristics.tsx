import { Link, useParams } from "react-router-dom";
import { useCost } from "../../contexts/cost";

export function CostAlernatingCurrentInputCharacteristics() {
    const { data } = useCost()
    const { id } = useParams<{ id: string }>()

    console.log(data)
    
    return (
        <div>
            <h1>CostAlernatingCurrentInputCharacteristics</h1>
            <Link to={`/cost/${id}/cost-battery-bank-characteristics`}>Proximo</Link>
        </div>
    );
}