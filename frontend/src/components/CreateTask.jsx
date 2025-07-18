import { useEffect, useState } from "react";
import api from "../api";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import LoadingIndicator from "./LoadingIndicator";
import Datepicker, { registerLocale } from 'react-datepicker'   
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru'

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
            const result = await api.post("/api/tasks/", {title, description, priority, workers, end_at: endDate})
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

    const handleSelectChange = (selectedOptions) => {
        selectWorkers(selectedOptions)
    }

    const handleChangePriority = (e) => {
        setPriority(e.target.value)
    }

    const handleDateChanged = (e) => {
        setEndDate(e)
    }

    return (
        <div className="createTaskContainer">
            <h4 className="createTaskTitle">Creating task</h4>
            <form className="createTaskForm" onSubmit={handleSubmit}>
                <input 
                    className="form-input" 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <input 
                    className="form-input"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <div className="usersContainer">
                    <Select
                        className="form-input"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        options={users}
                        isMulti
                        onChange={handleSelectChange}
                    />
                </div>
                <h5 style={{alignSelf: "center", margin: "10px 0"}}>Task priority</h5>
                <div className="priorityCont">
                    <div className="radioCont">
                        <label style={{color: "green"}}>Low</label>
                        <input 
                            className="input-radio"
                            type="radio"
                            name="group-priority"
                            style={{accentColor: "green"}}  
                            value={0}
                            onChange={handleChangePriority}
                        />
                    </div>
                    <div className="radioCont">
                        <label style={{color: "black"}}>Normal</label>
                        <input
                            className="input-radio" 
                            type="radio"
                            name="group-priority"
                            defaultChecked
                            value={1}
                            onChange={handleChangePriority}
                        />
                    </div>
                    <div className="radioCont">
                        <label style={{color: "red"}}>High</label>
                        <input 
                            className="input-radio"
                            type="radio"
                            name="group-priority"
                            style={{accentColor: "red"}}
                            value={2}
                            onChange={handleChangePriority}
                        />
                    </div>
                </div>
                <div className="deadLineContainer">
                    <h6>Deadline: </h6>
                    <Datepicker
                        selected={endDate}
                        // onChange={(date) => setEndDate(date)}
                        onSelect={(date) => setEndDate(date)}
                        onChange={handleDateChanged}
                        dateFormat={"dd.MM.yyyy HH:mm"}
                        timeFormat="HH:mm"
                        showTimeSelect
                        label="hehe"
                        className="form-date"
                    />
                </div>
                <button className="form-button" type="submit">
                    Create
                </button>

            </form>
        </div>
    )
}

export default CreateTask;