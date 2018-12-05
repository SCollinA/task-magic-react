import React from 'react'
import Task from './Task'

export default function Tasks(props){
    return (
        <div className="Tasks">
            {props.tasks.map((task, index) => <Task task={task} key={index} deleteTask={props.deleteTask} index={index}/>)}
        </div>
    )
}