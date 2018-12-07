import React from 'react'

export default function TaskInfo(props) {
    return (
    <div className='TaskInfo'>
        {props.currentTask ? 
            <ul>
                <li>Active: {(props.currentTask.active && 'true') || 'false'} </li>
                <li>Time Changed: {props.currentTask.time_changed}</li>
                <li>Time Created: {props.currentTask.time_created}</li>
            </ul>
            : <div className='TaskInfo'></div>
        }
    </div>
    )
}