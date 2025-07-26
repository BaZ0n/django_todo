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
            }, 2000)
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
            setErrorText("Ошибка! Пароли не совпадают.")
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
            <h1>Регистрация</h1>
            <div className="form-el">
                <input
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className={email.length == 0 ? "input-label" : "input-filled"}>Почта</label>
            </div>
            <div className="form-el">
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className={username.length == 0 ? "input-label" : "input-filled"}>Имя пользователя</label>
            </div>
            <div className="form-el">
                <input 
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label className={password.length == 0 ? "input-label" : "input-filled"}>Пароль</label>
            </div>
            <div className="form-el">
                <input 
                    className="form-input"
                    type="password"
                    value={password_repeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                />
                <label className={password_repeat.length == 0 ? "input-label" : "input-filled"}>Повторите пароль</label>
            </div>
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                Зарегестрироваться
            </button>
        </form>
            <button className="logInBTN" onClick={logInClick}>Уже есть аккаунт?</button>
            
        </div>        
    )
}

export default Register;