import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "../components/LoadingIndicator";
import AlertMessage from "../components/AlertMessage";

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_repeat, setPasswordRepeat] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertVisible, showAlert] = useState(false);
    const [alertType, setAlertType] = useState("")
    const [errorText, setErrorText] = useState("");
    const [isCorrectlyForm, setFormCorrectly] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (alertVisible) {
            const timer = setTimeout(() => {
                showAlert(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [alertVisible]);

    const checkForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (password.length < 8) {
            setErrorText("Пароль должен быть не меншье 8 символов")
            setAlertType("danger")
            showAlert(true)
        } else if (password != password_repeat) {
            setErrorText("Пароли не совпадают.")
            setAlertType("danger")
            showAlert(true)
        } else if (!emailRegex.test(email)) {
            setErrorText("Неправильно заполнена почта")
            setAlertType("danger")
            showAlert(true)
        }
        else {
            setFormCorrectly(true)
        }
    }

    const handleSubmit = async (e) => {
        checkForm()
        e.preventDefault()
        if (isCorrectlyForm) {
            setLoading(true);
            e.preventDefault();
            try {
                const result = await api.post("/api/user/register/", {email, username, password});
                navigate("/login")
            } catch(error) {
                console.log(error)
                setErrorText("Упс, ошибка")
                setAlertType("danger")
                showAlert(true)
            } finally {
                setLoading(false);
            }
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

    const handleAlertClose = () => {
        showAlert(false)
    }

    return (
        <div className="logSignInContainer">
            {alertVisible && <AlertMessage type={alertType} errorText={errorText} onClose={handleAlertClose}></AlertMessage>}
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
