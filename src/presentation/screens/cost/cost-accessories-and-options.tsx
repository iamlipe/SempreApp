import { Link, useParams } from "react-router-dom";
import { useCost } from "../../contexts/cost";

export function CostAccessoriesAndOptions() {
    const { data } = useCost()
    const { id } = useParams<{ id: string }>()

    console.log(data)

    return (
        <div>
            <h1>CostAccessoriesAndOptions</h1>
            <Link to={`/cost/${id}/cost-voltmeter-and-transducers`}>Proximo</Link>
        </div>
    );
}