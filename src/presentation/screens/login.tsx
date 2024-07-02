import { Link } from "react-router-dom";

export function Login() {
    return (
        <div>
            <h1>Login</h1>
            <Link to={'/home'}>Do Login</Link>
        </div>
    );
}