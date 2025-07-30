import { motion, AnimatePresence } from "motion/react"
import More_Button from "../assets/more.svg?react"
import { useEffect, useState } from "react"
import api from "../api"


function SubtaskElement({subtask}) {

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async() => {
        api
            .get(`/api/users/${subtask.worker}/`)
            .then((result) => result.data)
            .then((data) => {setUser(data)})
            .catch((error) => alert(error))
    }

    const [user, setUser] = useState([])
    const formattedStartDate = new Date(subtask.created_at).toLocaleDateString("ru-Ru")
    const formattedEndDate = new Date(subtask.end_at).toLocaleDateString("ru-Ru")
    const formattedEndTime = new Date(subtask.end_at).toLocaleTimeString("ru")

    const [dropdownMenu, showDropdownmenu] = useState(false)

    return (
        <div className="subtask-element">
            <div className="subtask-front">
                <div className="subtask-info">
                    <h5 className="subtask-title">{subtask.title}</h5>
                    <h5 className="subtask-worker">{user.username}</h5>
                </div>
            </div>
            <div className="subtask-back">
                <h6 className="subtask-start">{formattedStartDate}</h6>
                <h5 className="subtask-end">{formattedEndDate} : {formattedEndTime}</h5>
                <div className="subtask-menu">
                    {/* <button className="dropdown-btn">
                        <img className="dropdown-icon" src={More}/>
                    </button> */}
                    <More_Button 
                        src={More_Button}
                        className="dropdown-btn" 
                        onClick={() => showDropdownmenu(!dropdownMenu)}
                    />
                    <AnimatePresence>
                        {dropdownMenu &&
                            <motion.ul 
                                initial={{opacity: 0, x: 100}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: 100}}
                                className="dropdown_menu"
                            >
                                { 
                                    <li className="list-element">
                                        Начать
                                    </li>
                                }
                                <li className="list-element">
                                    Передать
                                </li>
                                <li className="list-element">
                                    Удалить
                                </li>
                            </motion.ul>
                        }
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )

}

export default SubtaskElement