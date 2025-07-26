import React, { useEffect, useState } from "react";
import api from "../api";

function Task({task}) {
    const formattedStartDate = new Date(task.created_at).toLocaleDateString("ru-Ru")
    const formattedEndDate = new Date(task.end_at).toLocaleDateString("ru-Ru")
    const [author, setAuthor] = useState([])
    
    useEffect(() => {
        getAuthor()
    }, [])

    const getAuthor = async() => {
        api 
            .get(`/api/users/get/${task.author}/`)
            .then((result) => result.data)
            .then((data) => {setAuthor(data)})
            .catch((error) => alert(error))
    }

    return (
        <div className={`task-element priority-${task.priority}`}>
            <div className="task-front">
                <p className="task-title"><strong>{task.title}</strong></p>
                <p className="task-date">{formattedEndDate}</p>
            </div>
            <div className="task-back">
                <p>Чё то тут надо будет выводить</p>
                {/* <div className="back-bottom">
                    <p className="task-author">{author.username}</p>
                    <p className="task-date">{formattedStartDate}</p>
                </div> */}
            </div>
        </div>
    )
}

export default Task;