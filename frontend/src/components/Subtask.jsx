import React, { useEffect, useState } from "react"
import api from "../api"
import CreateSubtask from "./CreateSubtask"
import SubtaskElement from "./SubtaskElement"

function Subtask({task}) {

    const [createWindow, showCreateWindow] = useState(false)
    const [subtasks, setSubtasks] = useState([])

    useEffect(() => {
        getSubtasks()
    }, [])

    const getSubtasks = () => {
        api
            .get(`/api/content/subtasks/?task_id=${task.id}`)
            .then((response) => response.data)
            .then((data) => {setSubtasks(data)})
            .catch((error) => alert(error))
    }

    return (
        <div className="subTaskContainer">
            <h1 className="title text-center">{task.title}</h1>
            <div className="subtask-list">
                <hr style={{color: "white"}}></hr>
                <button className="createSubtask" onClick={() => showCreateWindow(true)}>Создать подзадачу</button>
                {createWindow && <CreateSubtask task={task} />}
                {subtasks.map((subtask) => (
                    <SubtaskElement subtask={subtask} />
                ))}
            </div>
        </div>
    )
}

export default Subtask