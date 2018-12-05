import React from 'react'

export default function Task(props){
    return (
    <div className="Task">
        <h1 onClick={() => {
            console.log(`${props.task.name} task complete`)
            props.deleteTask(props.task.id)
        }}>
        {props.task.name}
        </h1>
        <h4>{props.task.time_created}</h4>
        <h4>{props.task.time_changed}</h4>
        <h4>{props.task.active.toString()}</h4>
    </div>
    )
}