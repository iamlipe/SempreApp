import { Link } from "react-router-dom";

export function Login() {
    return (
        <div>
            <h1 className="text-red-500">Login</h1>
            <Link to={'/home'}>Go to Home</Link>
        </div>
    ) 
}