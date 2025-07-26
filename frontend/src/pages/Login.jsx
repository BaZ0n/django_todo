import LoadingIndicator from "../components/LoadingIndicator";
import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Alert from 'react-bootstrap/Alert';


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
        setLoading(true);
        e.preventDefault();

        try {
            const result = await api.post("/api/token/", {username, password});
            localStorage.setItem(ACCESS_TOKEN, result.data.access);
            localStorage.setItem(REFRESH_TOKEN, result.data.refresh);
            navigate("/")
        } catch(error) {
            if (error.status === 401) {
                setErrorText("Ошибка входа. Аккаунт не найден.")
                showAlert(true)
            }
            else if (error.status === 400) {
                setErrorText("Ошибка входа. Заполнены не все поля.")
                showAlert(true)
            }
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
            {alertVisible && <Alert className="alert" variant="danger">{errorText}</Alert>}
            <form onSubmit={handleSubmit} className="form-container">
                <h1>Авторизация</h1>
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
                {loading && <LoadingIndicator />}
                <button className="form-button" type="submit">
                    Войти
                </button>
            </form>
            <button className="password-remember">Забыли пароль?</button>
            <button className="signInBTN" onClick={signInClick}>Зарегистрироваться</button>
        </div>
        
    )
}

export default Login;