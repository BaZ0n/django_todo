import { use, useEffect, useState } from "react";
import api from "../api";
import Select from "react-select"
import makeAnimated from 'react-select/animated';
import { AnimatePresence, motion, useSpring } from "motion/react"
import DatePicker from "react-datepicker";

function TaskInfo({task, toReload}) {

    const priority_options = [
        {value: 0, label: "Низкий"},
        {value: 1, label: "Средний"},
        {value: 2, label: "Высокий"}
    ]

    const dropdown_menu_show = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            y: -100
        }
    }

    const firstRenderVariants = {
        hidden: { 
            opacity: 0,
            y: 500
        },
        visible: {
            opacity: 1,
            y: 0
        }
    }

    const OtherRenderVariants = {
        hidden: { 
            opacity: 0,
        },
        visible: {
            opacity: 1,
        }
    }

    const animatedComponents = makeAnimated()
    const [dropdownMenu, showDropdownMenu] = useState(false)
    // const [reanimate, reanimateAnimation] = useState(false)

    // const [taskUpd, setTask] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState(0)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [workers, setWorkers] = useState([])
    const [isItFirstRender, setFirstRender] = useState(false) 
    const [statusText, setStatusText] = useState("Подробно")

    useEffect(() => {
        setStatusText()
        setTitle(task.title)
        setDescription(task.description)
        setPriority(task.priority)
        setStartDate(task.created_at)
        setEndDate(task.end_at)
        statusNumToString(task.status)
        // reanimateAnimation(!reanimate)
    }, [task])

    function statusNumToString(status) {
        {status == 0 
            ? setStatusText("В ожидании")
            : status == 1 
            ? setStatusText("В процессе")
            : status == 2
            ? setStatusText("Завершён")
            : setStatusText("В архиве")
        }
    }
    
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
            .then((result) => console.log(result.status))
            .catch((error) => alert(error))
        
        statusNumToString(value)
        toReload()
    }

    return ( 
        <div>
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
                        components={animatedComponents}
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
                <div className="startEndDateContainer">
                    <div className="dateContainer form-element">
                        <DatePicker 
                            className="form-input"
                            dateFormat={"dd.MM.yyyy HH:mm"}
                            timeFormat="HH:mm"
                            showTimeSelect
                            wrapperClassName="form-date"
                            selected={startDate}
                            onChange={handleDateChanged}
                            onSelect={(e) => setEndDate(e.target.value)}
                            disabled
                        />
                        <label className={endDate.length == 0 ? "input-label" : "filled-input"}>Дата создания</label>
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
                                exit="hidden"
                                variants={dropdown_menu_show}
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
    )
}

export default TaskInfo