import React from 'react'
import TaskInfo from './TaskInfo'

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
        <div/>
    ]
    return (
        <div className="TaskContent">
            {contentOptions[props.contentChoice]}
        </div>
    )
}