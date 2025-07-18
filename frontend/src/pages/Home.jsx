import { useEffect, useState } from "react";
import api from "../api";
import Task from "../components/Task"
import CreateTask from "../components/CreateTask";

function Home() {
    const [tasks, setTasks] = useState([])
    const [createTaskShow, showCreateForm] = useState(false)
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        // getNotes()
    }, )

    const handleCreateTask = () => {
        showCreateForm(true)
    }

    // const getNotes = () => {
    //     api
    //         .get("/api/notes/")
    //         .then((result) => result.data)
    //         .then((data) => {setNotes(data)})
    //         .catch((error) => alert(error))
    // }


    const getTasks = () => {
        api 
            .get("/api/tasks/")
            .then((result) => result.data)
            .then((data) => {setTasks(data)})
            .catch((error) => alert(error))
    }
    // const deleteNote = (id) => {
    //     api.delete(`/api/notes/delete/${id}`).then((result) => {
    //         if (result.status === 204) alert("Note deleted")
    //         else alert("Delete failed")
    //         getNotes()
    //     }).catch((error) => alert(error)) 
    // }

    // const createNote = (e) => {
    //     e.preventDefault()
    //     api.post("/api/notes/", {content, title}).then((result) => {
    //         if (result.status === 201) alert("Note created")
    //         else alert("Creating failed" + result.status)
    //         getNotes()
    //     }).catch((error) => alert(error))
    // }
    
    return (
        <div className="pageCont">
            <div className="tasksColumn">
                <h1>Tasks</h1>
                {!createTaskShow && 
                    <button className="createTaskBTN" onClick={handleCreateTask}>
                        Create Task
                    </button>
                }
                {createTaskShow && <CreateTask />}
                <hr />
                {tasks.map((task) => (
                    <Task task={task} key={task.id} />
                ))}
            </div>
            <div className="taskColumn">
                <h1>Тут задача, подзадачи</h1>
            </div>
        </div>
    )
}

export default Home;