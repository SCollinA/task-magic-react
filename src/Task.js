import React from 'react'

export default function Task(props){
    return (
    <h1 onClick={() => {
        console.log(`${props.task.name} task complete`)
        props.deleteTask(props.task.id)
    }}>
    {props.task.name}
    </h1>
    )
}