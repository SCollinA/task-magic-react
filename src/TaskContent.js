import React from 'react'
import TaskInfo from './TaskInfo'

export default function TaskContent(props) {
    const contentOptions = [
        <TaskInfo task={props.task}/>,
        <TaskInfo task={props.task}/>,
        <TaskInfo task={props.task}/>,
        <TaskInfo task={props.task}/>,
        <TaskInfo task={props.task}/>,
        <TaskInfo task={props.task}/>,
        <TaskInfo task={props.task}/>,
        <TaskInfo task={props.task}/>,
        <TaskInfo task={props.task}/>,
        <TaskInfo task={props.task}/>,
        <TaskInfo task={props.task}/>,
        <TaskInfo task={props.task}/>,
    ]
    return (
        <div className="TaskContent">
            {contentOptions[props.contentChoice]}
        </div>
    )
}