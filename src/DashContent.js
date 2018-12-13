import React from 'react'
import TaskInfo from './TaskInfo'
import TaskSearch from './TaskSearch'
import TaskAdd from './TaskAdd'
import TaskShare from './TaskShare'

export default function DashContent(props) {
    const contentOptions = [
        null,
        <TaskInfo task={props.task}/>,
        <TaskSearch 
        onReset={props.onReset} 
        searchTerm={props.searchTerm} 
        updateSearch={props.updateSearch}
        />,
        <TaskAdd 
        addTask={props.action}
        onReset={props.onReset}
        searchTerm={props.searchTerm}
        updateSearch={props.updateSearch}
        />,
        null,
        null,
        null,
        null,
        null,
        null,
        <TaskShare shareTask={props.shareTask} />
    ]
    return (
        <div className={`DashContent ${contentOptions[props.contentChoice] && 'hackerStyle'}`}>
            {contentOptions[props.contentChoice]}
        </div>
    )
}