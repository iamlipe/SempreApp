import { Link } from "react-router-dom";
import { useProposal } from "../../contexts/proposal";

export function ProposalPayment() {
    const { data } = useProposal()
    console.log(data)
    return (
        <div>
            <h1>ProposalPayment</h1>
            <Link to={'/proposal/specifications'} >Proximo</Link>
        </div>
    );
}