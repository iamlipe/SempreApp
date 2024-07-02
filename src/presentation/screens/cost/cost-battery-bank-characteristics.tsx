import { Link, useParams } from "react-router-dom";
import { useCost } from "../../contexts/cost";

export function CostBatteryBankCharacteristics() {
    const { data } = useCost()
    const { id } = useParams<{ id: string }>()

    console.log(data)
    return (
        <div>
            <h1>CostBatteryBankCharacteristics</h1>
            <Link to={`/cost/${id}/cost-consumer-characteristics`}>Proximo</Link>
        </div>
    );
}