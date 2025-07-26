import react, { useState } from "react"
import { registerLocale } from "react-datepicker"

registerLocale('ru', ru)

function Subtask (task) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState(0)
    const [status, setStatus] = useState(0)
    const [worker, setWorker] = useState([])
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    
}

export default Subtask