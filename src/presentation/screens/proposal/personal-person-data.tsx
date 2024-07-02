import { Link } from "react-router-dom";
import { useProposal } from "../../contexts/proposal";

export function ProposalPersonData() {
    const { data } = useProposal()
    console.log(data)
    return (
        <div>
            <h1>ProposalPersonData</h1>
            <Link to={'/proposal/payment'} >Proximo</Link>
        </div>
    );
}