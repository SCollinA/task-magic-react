import React from 'react'
import TaskInfo from './TaskInfo'
import TaskSearch from './TaskSearch'
import TaskShare from './TaskShare'

export default function DashContent(props) {
    const contentOptions = [
        null,
        <TaskInfo task={props.task}/>,
        <TaskSearch 
        searchSubmit={props.action}
        onReset={props.onReset} 
        prompt={props.prompt} 
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
        <TaskShare shareTask={props.shareTask} />
    ]
    return (
        <div className={`DashContent ${contentOptions[props.contentChoice] && 'hackerStyle'}`}>
            {contentOptions[props.contentChoice]}
        </div>
    )
}