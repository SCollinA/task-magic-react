import React from 'react'
import TaskInfo from './TaskInfo'
import TaskSearch from './TaskSearch'
import TaskAdd from './TaskAdd'
import TaskEdit from './TaskEdit'
import TaskDelete from './TaskDelete'
import TaskShare from './TaskShare'

export default function DashContent(props) {
    const contentOptions = [
        null,
        <TaskInfo task={props.task}/>,
        <TaskAdd 
        addTask={props.action}
        onReset={props.onReset}
        searchTerm={props.searchTerm}
        updateSearch={props.updateSearch}
        />,
        <TaskEdit 
        task={props.task}
        editTask={props.action}
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
        null,
        null,
        <TaskShare 
        searchTerm={props.searchTerm}
        updateSearch={props.updateSearch}
        onReset={props.onReset}
        shareTask={props.action} 
        />,
        null,
        <TaskDelete/>,
        <TaskSearch 
        onReset={props.onReset} 
        searchTerm={props.searchTerm} 
        updateSearch={props.updateSearch}
        />
    ]
    return (
        <div className={`DashContent ${contentOptions[props.contentChoice] && 'hackerStyle'}`}>
            {contentOptions[props.contentChoice]}
        </div>
    )
}