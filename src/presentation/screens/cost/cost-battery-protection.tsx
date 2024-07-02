import { Link, useParams } from "react-router-dom";
import { useCost } from "../../contexts/cost";

export function CostBatteryProtection() {
    const { data } = useCost()
    const { id } = useParams<{ id: string }>()

    console.log(data)
    return (
        <div>
            <h1>CostBatteryProtection</h1>
            <Link to={`/cost/${id}/cost-consumer-protection`}>Proximo</Link>
        </div>
    );
}