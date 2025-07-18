import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "../components/LoadingIndicator";
import Alert from 'react-bootstrap/Alert';

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_repeat, setPasswordRepeat] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertVisible, showAlert] = useState(false);
    const [errorText, setErrorText] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        if (alertVisible) {
            const timer = setTimeout(() => {
                showAlert(false)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [alertVisible]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password === password_repeat) {
            setLoading(true);
            e.preventDefault();
            try {
                const result = await api.post("/api/user/register/", {email, username, password});
                navigate("/login")
            } catch(error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        }
        else {
            setErrorText("Error! Your passwords don't match.")
            showAlert(true)
        }
    }

    const logInClick = (e) => {
        setLoading(true)
        e.preventDefault();

        try {
            navigate("/login")
        } catch(error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="logSignInContainer">
            {alertVisible && <Alert className="alert" variant="danger">{errorText}</Alert>}
            <form onSubmit={handleSubmit} className="form-container">
            <h1>Sign In</h1>
            <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
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
            <input 
                className="form-input"
                type="password"
                value={password_repeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
                placeholder="Repeat your password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                Registrate
            </button>
        </form>
            <button className="signInBTN" onClick={logInClick}>Log In</button>
        </div>        
    )
}

export default Register;