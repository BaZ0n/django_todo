import LoadingIndicator from "../components/LoadingIndicator";
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const result = await api.post("/api/token/", {username, password});
            localStorage.setItem(ACCESS_TOKEN, result.data.access);
            localStorage.setItem(REFRESH_TOKEN, result.data.refresh);
            navigate("/")
        } catch(error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    const signInClick = (e) => {
        setLoading(true)
        e.preventDefault();

        try {
            navigate("/register")
        } catch(error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="logSignInContainer">
            <form onSubmit={handleSubmit} className="form-container">
            <h1>Login</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input 
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                Login
            </button>
        </form>
            <button className="password-remember">Remember password</button>
            <button className="signInBTN" onClick={signInClick}>Sign In</button>
        </div>
                
        
    )
}

export default Login;