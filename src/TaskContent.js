import React from 'react'
import TaskInfo from './TaskInfo'
import TaskShare from './TaskShare'

export default function TaskContent(props) {
    const contentOptions = [
        <div/>,
        <TaskInfo task={props.task}/>,
        <div/>,
        <div/>,
        <div/>,
        <div/>,
        <div/>,
        <div/>,
        <div/>,
        <div/>,
        <div/>,
        <TaskShare shareTask={props.shareTask} />
    ]
    return (
        <div className="TaskContent hackerStyle">
            {contentOptions[props.contentChoice]}
        </div>
    )
}