import { act, use, useEffect, useState } from "react"
import api from "../api"
import TaskElement from "../components/TaskElement"
import CreateTask from "../components/CreateTask"
import { AnimatePresence, motion } from "motion/react"
import TaskInfo from "../components/TaskInfo"
import ArrowForward from "../assets/arrow_forward.svg"
import ArrowBack from "../assets/arrow_back.svg" 
import Subtask from "../components/Subtask"
import ArrowDropUp from "../assets/arror_drop_up.svg?react"
import ArrowDropDown from "../assets/arror_drop_down.svg?react"

function Home() {

    const [createTaskShow, showCreateForm] = useState(false)
    const [task, selectTask] = useState([])
    const [isTaskColumnVisible, setTaskColumnVisible] = useState(false)
    const [isSubtaskPage, setSubtaskPage] = useState(false)
    const [reanimate, reanimateAnimation] = useState(false)
    // const [isLoading, setLoading] = useState(false)
    const [waitingTasks, setWaitingTasks] = useState([])
    const [activeTasks, setActiveTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [archiveTasks, setArchive] = useState([])
    // const [burningTasks, setBurningTasks] = useState([])

    const [isWaitingListShowed, showWaitingList] = useState(false)
    const [isActiveListShowed, showActiveList] = useState(false)
    const [isCompletedListShowed, showCompletedList] = useState(false)
    const [isArchiveListShowed, showArchiveList] = useState(false)
    // const [isBurningTasks, showBurningTasks] = useState(false)

    const [reload, reloadPage] = useState(false)

    useEffect(() => {
        getTasks()
    }, [reload])

    const handleCreateTask = () => {
        showCreateForm(true)
    }

    const getTasks = () => {
        api 
            .get("/api/content/tasks/")
            .then((result) => result.data)
            .then((data) => {
                setWaitingTasks(data.filter((d) => d.status == 0))
                setActiveTasks(data.filter((d) => d.status == 1))
                setCompletedTasks(data.filter((d) => d.status == 2))
                setArchive(data.filter((d) => d.status == 3))
                // setBurningTasks(data.filter((d) => d.end_at > Date.now))
            })
            .catch((error) => alert(error))
    }
    

    const handleTaskClicked = (task) => {  
        setTaskColumnVisible(false)
        selectTask(task)
        setTaskColumnVisible(true)
        reanimateAnimation(!reanimate)
    }

    const changePage = () => {
        reanimateAnimation(!reanimate)
        setSubtaskPage(!isSubtaskPage)
    }

    const reloadFunc = () => {
        console.log("зашёл")
        getTasks()
    }
    
    return (
        <div className="pageCont">
            <div className="tasksColumn">
                <h1 style={{color: "white"}}>Задачи</h1>
                <hr />
                <button className="createTaskBTN" onClick={handleCreateTask}>
                    Создать новую задачу
                </button>
                <div className="tasks-container">
                    <div className="tasks-list">
                        <div className="tasks-header">
                            <h3 className="tasks-container-title">В ожидании</h3>
                            {isWaitingListShowed ? 
                                <ArrowDropUp
                                    // src={ArrowDropUp}
                                    className="showTasksBTN"
                                    onClick={() => showWaitingList(false)}
                                /> :
                                <ArrowDropDown 
                                    // src={ArrowDropDown}
                                    className="showTasksBTN"
                                    onClick={() => showWaitingList(true)}
                                />
                            }
                        </div>
                        <div className="tasks-table">
                            <AnimatePresence>
                                {isWaitingListShowed &&
                                    waitingTasks.map((task) => (
                                    <motion.button
                                        initial={{x: -200, opacity: 0 }}
                                        animate={{x: 0, opacity: 1}}
                                        exit={{x: -200, opacity: 0}}
                                        transition={{duration: 0.3}}
                                        key={task.id} 
                                        className="task-button" 
                                        onClick={() => handleTaskClicked(task)}>
                                        <TaskElement task={task}/>
                                    </motion.button>     
                                ))
                                }
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="tasks-list">
                        <div className="tasks-header">
                            <h3 className="tasks-container-title">Активные</h3>
                            {isActiveListShowed ? 
                                <ArrowDropUp
                                    // src={ArrowDropUp}
                                    className="showTasksBTN"
                                    onClick={() => showActiveList(false)}
                                /> :
                                <ArrowDropDown 
                                    // src={ArrowDropDown}
                                    className="showTasksBTN"
                                    onClick={() => showActiveList(true)}
                                />
                            }
                        </div>
                        <div className="tasks-table">
                            <AnimatePresence>
                                {isActiveListShowed &&
                                    activeTasks.map((task) => (
                                    <motion.button
                                        initial={{x: -200, opacity: 0 }}
                                        animate={{x: 0, opacity: 1}}
                                        exit={{x: -200, opacity: 0}}
                                        transition={{duration: 0.3}}
                                        key={task.id} 
                                        className="task-button" 
                                        onClick={() => handleTaskClicked(task)}>
                                        <TaskElement task={task}/>
                                    </motion.button>     
                                ))
                                }
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="tasks-list">
                        <div className="tasks-header">
                            <h3 className="tasks-container-title">Завершённые</h3>
                            {isCompletedListShowed ? 
                                <ArrowDropUp
                                    // src={ArrowDropUp}
                                    className="showTasksBTN"
                                    onClick={() => showCompletedList(false)}
                                /> :
                                <ArrowDropDown 
                                    // src={ArrowDropDown}
                                    className="showTasksBTN"
                                    onClick={() => showCompletedList(true)}
                                />
                            }
                        </div>
                        <div className="tasks-table">
                            <AnimatePresence>
                                {isCompletedListShowed &&
                                    completedTasks.map((task) => (
                                    <motion.button
                                        initial={{x: -200, opacity: 0 }}
                                        animate={{x: 0, opacity: 1}}
                                        exit={{x: -200, opacity: 0}}
                                        transition={{duration: 0.3}}
                                        key={task.id} 
                                        className="task-button" 
                                        onClick={() => handleTaskClicked(task)}>
                                        <TaskElement task={task}/>
                                    </motion.button>     
                                ))
                                }
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="tasks-list">
                        <div className="tasks-header">
                            <h3 className="tasks-container-title">Архив</h3>
                            {isArchiveListShowed ? 
                                <ArrowDropUp
                                    // src={ArrowDropUp}
                                    className="showTasksBTN"
                                    onClick={() => showArchiveList(false)}
                                /> :
                                <ArrowDropDown 
                                    // src={ArrowDropDown}
                                    className="showTasksBTN"
                                    onClick={() => showArchiveList(true)}
                                />
                            }
                        </div>
                        <div className="tasks-table">
                            <AnimatePresence>
                                {isArchiveListShowed &&
                                    archiveTasks.map((task) => (
                                    <motion.button
                                        initial={{x: -200, opacity: 0 }}
                                        animate={{x: 0, opacity: 1}}
                                        exit={{x: -200, opacity: 0}}
                                        transition={{duration: 0.3}}
                                        key={task.id} 
                                        className="task-button" 
                                        onClick={() => handleTaskClicked(task)}>
                                        <TaskElement task={task} toReload={reloadFunc}/>
                                    </motion.button>     
                                ))
                                }
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
            <div className="taskColumn">
                {(isTaskColumnVisible) && 
                <AnimatePresence> 
                    { !isSubtaskPage &&
                    <motion.div
                        key={reanimate}
                        className="animatedContainer"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0.5, x: -1000, y: -100}}
                        transition={{duration: 0.5}}
                    >
                        
                        <TaskInfo task={task}/>
                    </motion.div>
                    }
                </AnimatePresence>
                }
                {isTaskColumnVisible &&
                    <div className={isSubtaskPage 
                        ? "changeComponentBTN back" 
                        : "changeComponentBTN forward"} 
                        onClick={changePage}
                    >
                        {isSubtaskPage 
                        ? <img src={ArrowBack} /> 
                        : <img src={ArrowForward} />}
                    </div>
                }
                {(isTaskColumnVisible) && 
                    <AnimatePresence>
                        {isSubtaskPage &&
                            <motion.div
                                key={reanimate}
                                className="animatedContainer"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0.5, x: 1000, y: -100}}
                                transition={{duration: 0.5}}    
                            >
                                <Subtask task={task}/>
                            </motion.div>
                        }
                    </AnimatePresence>
                    
                }
            </div>

            {createTaskShow && 
                <CreateTask /> 
            }
        </div>
    )
}

export default Home;