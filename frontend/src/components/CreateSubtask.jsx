import react, { useEffect, useState } from "react"
import Datepicker, { registerLocale } from "react-datepicker"
import api from "../api";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import LoadingIndicator from "./LoadingIndicator"
import "react-datepicker/dist/react-datepicker.css"
import ru from 'date-fns/locale/ru'

registerLocale('ru', ru)

function CreateSubtask ({task}) {
    
    const animatedComponents = makeAnimated()

    const [title, setTitle] = useState("")
    const [priority, setPriority] = useState(0)
    const [users, setUsers] = useState([])
    const [workers, selectWorkers] = useState()
    const [endDate, setEndDate] = useState(new Date())
    const [isLoading, setLoading] = useState(false)

    const handleChangePriority = (e) => {
        setPriority(e.target.value)
    }

    const handleDateChanged = (e) => {
        setEndDate(e)
    }
    
    const handleSelectChange = (selectedUsers) => {
        console.log(selectedUsers)
        const selectedIDs = selectedUsers.value
        selectWorkers(selectedIDs)
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
            const result = await api.post("/api/content/subtasks/", {title, priority, worker: workers, end_at: endDate, task: task.id})
            if (result.status === 201) {
                alert("Subtask Created!")
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

    return (
        <div className="createTaskContainer">
            <form className="createTaskForm" onSubmit={handleSubmit}>
                <h3 className="createTaskTitle">Создание подзадачи</h3>
                <div className="form-el">
                    <input
                        className="form-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className={title.length == 0 ? "input-label" : "input-filled"}>Заголовок</label>
                </div>
                <div className="usersContainer form-el">
                    <Select
                        className="users-input"
                        classNamePrefix="user-select"
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        options={users}
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
                    <label className={workers == 0 ? "input-label" : "input-filled"}>Выберите пользователей</label>
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
            </form>
        </div>
    )
    
}

export default CreateSubtask