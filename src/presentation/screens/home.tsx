import { Link } from "react-router-dom";

export function Home() {
    return (
        <div className="flex flex-col">
            <Link to={'/proposal/person-data'} >Create Proposal</Link>
            <Link to={'/cost/1/cost-basic-characteristics'} >Edit Cost Proposal</Link>
            <Link to={'/'} >Go To Login</Link>
            <Link to={'/document'} >Go To Document</Link>
        </div>
    )
}