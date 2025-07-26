import React, { useEffect, useState } from "react";
import api from "../api";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import LoadingIndicator from "./LoadingIndicator";
import Datepicker, { registerLocale } from 'react-datepicker'   
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru'
import ReactDOM from 'react-dom'
import { motion } from "motion/react";

registerLocale('ru', ru )

function CreateTask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [searchQuery, setSearch] = useState("")
    const [priority, setPriority] = useState(1)
    const [workers, selectWorkers] = useState([])
    const [endDate, setEndDate] = useState(new Date());

    const [users, setUsers] = useState([])
    const [onLoading, setLoading] = useState(false)
    const animatedComponents = makeAnimated()
    const [isVisible, setVisible] = useState(true)

    const animationVariants = {
        hidden: {
            opacity: 0,
            x: -500,
        },
        visible: {
            opacity: 1,
            x: 0,
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async() => {
        api 
            .get("/api/users/get")
            .then((result) => result.data)
            .then((data) => {
                const formattedUsers = data.map(user => ({
                    value: user.id,
                    label: user.username
                }))
                setUsers(formattedUsers)
            })
            .catch((error) => alert(error))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await api.post("/api/content/tasks/", {title, description, priority, workers, end_at: endDate})
            if (result.status === 201) {
                alert("Task Created!")
            } 
            else {
                alert("Error")
            }
        }
        catch(error) {
            alert(error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleSelectChange = (selectedUsers) => {
        console.log(selectedUsers)
        const selectedIDs = selectedUsers.map(user => user.value)
        selectWorkers(selectedIDs)
    }

    const handleChangePriority = (e) => {
        setPriority(e.target.value)
    }

    const handleDateChanged = (e) => {
        setEndDate(e)
    }

    const closeWindow = () => {
        setVisible(false)
    }

    return (
        <div className="createTaskContainer">
            <motion.form className="createTaskForm" onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={animationVariants}
            transition={{duration: 0.5}}>
                <h3 className="createTaskTitle">Создание задачи</h3>
                <div className="form-el">
                    <input 
                        className="form-input" 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className={title.length == 0 ? "input-label" : "input-filled"}>Заголовок</label>
                </div>
                <div className="form-el">
                    <textarea 
                        className="form-input"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}    
                    />
                    <label className={description.length == 0 ? "input-label" : "input-filled"}>Описание</label>    
                </div>
                <div className="usersContainer form-el">
                    <Select
                        className="users-input"
                        classNamePrefix="user-select"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        options={users}
                        isMulti
                        placeholder=""
                        onChange={handleSelectChange}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                border: "0",
                                boxShadow: "none",
                                borderRadius: "5px",
                                borderBottom: "solid 1px gray",
                                backgroundColor: state.isFocused ? "white" : "transperent",
                                outline: "none",
                                transition: "all .2s linear",   
                                '&:hover': {
                                    color: "gray"
                                },
                            }),
                            options: (baseStyles, state) => ({
                                ...baseStyles,
                                borderRadius: "10px",
                            }),
                        }}
                    />
                    <label className={workers.length == 0 ? "input-label" : "input-filled"}>Выберите пользователей</label>
                </div>
                <div className="deadLineContainer form-el">
                    <Datepicker
                        selected={endDate}
                        // onChange={(date) => setEndDate(date)}
                        onSelect={(date) => setEndDate(date)}
                        onChange={handleDateChanged}
                        dateFormat={"dd.MM.yyyy HH:mm"}
                        timeFormat="HH:mm"
                        showTimeSelect
                        wrapperClassName="form-date"
                    />
                    <label className="datepicker-label">Дедлайн: </label>
                </div>
                <h5 style={{alignSelf: "center", margin: "10px 0"}}>Приоритет</h5>
                <div className="priorityCont">
                    <div className="radioCont">
                        <label style={{color: "var(--low_priority-color)"}}>Низкий</label>
                        <input 
                            className="input-radio"
                            type="radio"
                            name="group-priority"
                            style={{accentColor: "var(--low_priority-color)"}}  
                            value={0}
                            onChange={handleChangePriority}
                        />
                    </div>
                    <div className="radioCont">
                        <label style={{color: "var(--normal_priority-color)"}}>Средний</label>
                        <input
                            className="input-radio" 
                            type="radio"
                            name="group-priority"
                            defaultChecked
                            style={{accentColor: "var(--normal_priority-color)"}}
                            value={1}
                            onChange={handleChangePriority}
                        />
                    </div>
                    <div className="radioCont">
                        <label style={{color: "var(--high_priority-color)"}}>Высокий</label>
                        <input 
                            className="input-radio"
                            type="radio"
                            name="group-priority"
                            style={{accentColor: "var(--high_priority-color)"}}
                            value={2}
                            onChange={handleChangePriority}
                        />
                    </div>
                </div>
                <button className="form-button" type="submit">
                    Create
                </button>
            </motion.form>
            <div className="backgroundContainer" onClick={closeWindow}></div>
        </div>
    )
}

export default CreateTask;