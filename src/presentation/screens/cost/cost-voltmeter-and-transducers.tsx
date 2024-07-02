import { Link, useParams } from "react-router-dom";
import { useCost } from "../../contexts/cost";

export function CostVoltmeterAndTransducers() {
    const { data } = useCost()
    const { id } = useParams<{ id: string }>()

    console.log(data)
    return (
        <div>
            <h1>CostVoltmeterAndTransducers</h1>
            <Link to={`/cost/${id}/cost-front-panel-manual-control`}>Proximo</Link>
        </div>
    );
}
    