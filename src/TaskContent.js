import React from 'react'
import TaskInfo from './TaskInfo'
import TaskShare from './TaskShare'

export default function TaskContent(props) {
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
        <div className={`TaskContent ${contentOptions[props.contentChoice] && 'hackerStyle'}`}>
            {contentOptions[props.contentChoice]}
        </div>
    )
}