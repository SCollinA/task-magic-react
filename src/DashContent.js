import React from 'react'
import TaskInfo from './TaskInfo'
import TaskShare from './TaskShare'

export default function TaskDashContent(props) {
    const contentOptions = [
        null,
        <TaskInfo task={props.task}/>,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        <TaskShare shareTask={props.shareTask} />
    ]
    return (
        <div className={`TaskDashContent ${contentOptions[props.contentChoice] && 'hackerStyle'}`}>
            {contentOptions[props.contentChoice]}
        </div>
    )
}