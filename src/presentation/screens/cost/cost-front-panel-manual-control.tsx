import { Link, useParams } from "react-router-dom";
import { useCost } from "../../contexts/cost";

export function CostFrontPanelManualControl() {
    const { data } = useCost()
    const { id } = useParams<{ id: string }>()

    console.log(data, id)
    
    return (
        <div>
            <h1>CostVoltmeterAndTransducers</h1>
            <Link to={'/home'}>Terminar</Link>
        </div>
    );
}