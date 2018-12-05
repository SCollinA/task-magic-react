import React from 'react'

export default function Task(props) {
    return (
        <div className="Task" id={props.id}>
            <h1 onClick={() => {
                console.log(`${props.task.name} selected`)
                props.selectTask(props.task)
            }}>
                {props.selectedTask && props.selectedTask.id === props.task.id ? props.searchTerm : props.task.name}
            </h1>
            <div className="childNames">
                <p>
                    {props.task.children.map(child => child.name).join(', ')}
                </p>
            </div>
            <div className="taskTimes">
                <h4>{props.task.time_changed}</h4>
                <h6>{props.task.time_created}</h6>
            </div>
            <h4 onClick={() => {
                console.log(`${props.task.name} changed`)
                props.completeTask(props.task)
            }}>{props.task.active.toString()}</h4>
        </div>
        )
}