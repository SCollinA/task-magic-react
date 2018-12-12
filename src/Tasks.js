import React from 'react'
import Task from './Task'

export default function Tasks(props){
    return (
        <div className={`Tasks`}>
            {props.parents.map(task => <Task task={task}/>)}
            <Task task={props.currentTask}/>
            {props.children.map(task => <Task task={task}/>)}
        </div>
    )
}