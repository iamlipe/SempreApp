import { Link } from "react-router-dom";
import { useProposal } from "../../contexts/proposal";

export function ProposalSpecifications() {
    const { data } = useProposal()
    console.log(data)
    return (
        <div>
            <h1>ProposalSpecifications</h1>
            <Link to={'/home'}>Terminar</Link>
        </div>
    );
}