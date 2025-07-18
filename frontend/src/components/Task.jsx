import React from "react";

function Note({task}) {
    const formattedDate = new Date(task.created_at).toLocaleDateString("en-Us")

    return (
        <div className="task-container">
            <p className="task-title">{task.title}</p>
            <p className="task-date">{formattedDate}</p>
            <p className="task-author">{task.author}</p>
        </div>
    )
}

export default Note;