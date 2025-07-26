import { use, useEffect, useState } from "react";
import api from "../api";
import Task from "../components/Task"
import CreateTask from "../components/CreateTask";
import Select from "react-select"
import makeAnimated from 'react-select/animated';
import { AnimatePresence, motion } from "motion/react"
import DatePicker from "react-datepicker";
import axios from "axios";

function Home() {
    const priority_options = [
        {value: 0, label: "Низкий"},
        {value: 1, label: "Средний"},
        {value: 2, label: "Высокий"}
    ]

    const showVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            y: -100
        }
    }

    const [tasks, setTasks] = useState([])
    const [createTaskShow, showCreateForm] = useState(false)
    const [task, selectTask] = useState([])
    const animatedComponents = makeAnimated()
    const [dropdownMenu, showDropdownMenu] = useState(false)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState(0)
    const [endDate, setEndDate] = useState(new Date())
    const [workers, setWorkers] = useState([])
    const [statusText, setStatusText] = useState("Подробно")

    useEffect(() => {
        getTasks()
    }, [])

    const handleCreateTask = () => {
        showCreateForm(true)
    }

    const getTasks = () => {
        api 
            .get("/api/content/tasks/")
            .then((result) => result.data)
            .then((data) => {setTasks(data)})
            .catch((error) => alert(error))
    }

    const getTask = () => {
        api
            .get(`/api/content/tasks/${task.id}/`)
            .then((result) => result.data)
            .then((data) => selectTask(data))
            .catch((error) => alert(error))

        setTitle(task.title)
        setDescription(task.description)
        setPriority(task.priority)
        setEndDate(task.end_at)
    }

    const handleTaskClicked = (task) => {
        selectTask(task)
        setTitle(task.title)
        setDescription(task.description)
        setPriority(task.priority)
        setEndDate(task.end_at)

        {task.status == 0 
            ? setStatusText("В ожидании")
            : task.status == 1 
            ? setStatusText("В процессе")
            : task.status == 2
            ? setStatusText("Завершён")
            : setStatusText("В архиве")
        }
    }

    // const deleteNote = (id) => {
    //     api.delete(`/api/notes/delete/${id}`).then((result) => {
    //         if (result.status === 204) alert("Note deleted")
    //         else alert("Delete failed")
    //         getNotes()
    //     }).catch((error) => alert(error)) 
    // }

    const handleDropdownMenu = () => {
        {dropdownMenu ? showDropdownMenu(false) : showDropdownMenu(true)}
    }

    const handleDateChanged = (e) => {
        setEndDate(e)
    }

    const changeStatus = async(value) => {

        if (task.status == value) {
            return null
        }

        api
            .patch(`/api/content/tasks/${task.id}/update_partial/`, {status: value})
            // .then((result) => result.data)
            .catch((error) => alert(error))
        
        {task.status+1 == 0 
            ? setStatusText("В ожидании")
            : task.status+1 == 1 
            ? setStatusText("В процессе")
            : task.status+1 == 2
            ? setStatusText("Завершён")
            : setStatusText("В архиве")
        }

        getTasks()
        getTask(task.id)
    }
    
    return (
        <div className="pageCont">
            <div className="tasksColumn">
                <h1 style={{color: "white"}}>Задачи</h1>
                <hr />
                <div className="tasks-container">
                    <button className="createTaskBTN task-button" onClick={handleCreateTask}>
                        Создать новую задачу
                    </button>
                    {tasks.map((task) => (
                        <button
                            key={task.id} 
                            className="task-button" 
                            onClick={() => handleTaskClicked(task)}>
                            <Task task={task}/>
                        </button>
                    ))}
                </div>
            </div>
            <div className="taskColumn">
                <div className="head">
                    <h1 style={{color: "white"}}>{statusText}</h1>
                </div>
                <form className="task-form">
                    <div className="form-element">
                        <input 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-input" />
                        <label className={title.length == 0 ? "label-input" : "filled-input"}>Заголовок</label>
                    </div>
                    <div className="form-element">
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label className={description.length == 0 ? "label-input" : "filled-input"}>Описание</label>
                    </div>
                    <div className="usersContainer form-element">
                        <Select 
                            options={priority_options}
                            value={priority_options[priority]}
                            onChange={(e) => setPriority(e.target.value)}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderRadius: "10px",
                                    backgroundColor: "transparent",
                                    color: "white",
                                    padding: "10px",
                                    fontSize: "large"
                                }),
                                input: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: "white",
                                }),
                                singleValue: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: state.value == 0 
                                        ? "var(--low_priority-color)" 
                                        : state.value == 1 
                                        ? "var(--normal_priority-color)" 
                                        : "var(--high_priority-color)", 
                                }),
                                menu: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: "var(--background-color)",
                                    borderRadius: "10px",
                                    zIndex: "3"
                                }),
                                option: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: state.value == 0 
                                    ? "var(--low_priority-color)" 
                                    : state.value == 1 
                                    ? "var(--normal_priority-color)" 
                                    : "var(--high_priority-color)",
                                    borderRadius: "10px",
                                    '&:active': { 
                                        backgroundColor: state.value == 0 
                                        ? "var(--low_priority-color)" 
                                        : state.value == 1 
                                        ? "var(--normal_priority-color)" 
                                        : "var(--high_priority-color)", 
                                    },
                                    '&:hover': {
                                        backgroundColor: "var(--gray)"
                                    }
                                })
                            }}
                        />
                        <label className={priority.length == 0 ? "input-label" : "filled-input"}>Приоритет</label>
                    </div>
                    <div className="dateContainer form-element">
                        <DatePicker 
                            className="form-input"
                            dateFormat={"dd.MM.yyyy HH:mm"}
                            timeFormat="HH:mm"
                            showTimeSelect
                            wrapperClassName="form-date"
                            selected={endDate}
                            onChange={handleDateChanged}
                            onSelect={(e) => setEndDate(e.target.value)}
                            disabled
                        />
                        <label className={endDate.length == 0 ? "input-label" : "filled-input"}>Дедлайн до</label>
                    </div>
                </form>
                <div className="dropdown-container">
                    <div className="relativeCont">
                        <AnimatePresence>
                            { dropdownMenu ? 
                                <motion.ul
                                    className="dropdown_menu"
                                    initial="hidden"
                                    animate="visible"
                                    variants={showVariants}
                                    transition={{duration: 0.5}}
                                >   
                                    {task.status == 0 ? 
                                        <li className="dropdown_menu-element" onClick={() => changeStatus(1)}>Начать выполнение</li>
                                        : <li className="dropdown_menu-element" onClick={() => changeStatus(2)}>Выполнить</li>
                                    }
                                    <li className="dropdown_menu-element" onClick={() => changeStatus(3)}>В архив</li>
                                    <li className="dropdown_menu-element">Отказаться</li>
                                </motion.ul>
                            : null}
                        </AnimatePresence>
                        <button className="dropdown_menu-button" onClick={handleDropdownMenu}><p>+</p></button>
                    </div>
                </div>
            </div>

            {createTaskShow && 
                <CreateTask /> 
            }
        </div>
    )
}

export default Home;