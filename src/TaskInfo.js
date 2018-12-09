import React from 'react'

export default function TaskInfo(props) {
    return (
    <div className='TaskInfo'>
        {props.task ? 
            <ul>
                <li>Active: {(props.task.active && 'true') || 'false'} </li>
                <li>Time Changed: {props.task.time_changed}</li>
                <li>Time Created: {props.task.time_created}</li>
            </ul>
            : <div className='TaskInfo'></div>
        }
    </div>
    )
}