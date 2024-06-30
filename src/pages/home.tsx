import { Link } from "react-router-dom";

export function Home() {
    return (
        <div>
            <h1 className="text-blue-500">Home</h1>
            <Link to={'/'}>Go to Login</Link>
        </div>
    ) 
}