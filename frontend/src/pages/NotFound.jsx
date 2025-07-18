import Image from "../assets/backgroundImage.jpg"

function NotFound() {
    return (
        <div className="NotFoundContainer">
            <h1 className="NotFoundTitle">Страница не найдена</h1>
            <img src={Image} className="NotFoundBackgroundImage"/>
        </div>
    )
}

export default NotFound;