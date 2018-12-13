import React from 'react'
import UserLogout from './UserLogout'
import Task from './Task'

export default function Tasks(props) {
    const parentIDs = props.parents.map(task => task.id)
    const currentTaskID = props.currentTask && props.currentTask.id
    const childIDs = props.children.map(task => task.id)
    return (
        <div className={`Tasks`}>
            <UserLogout user={props.user} logout={props.logout}/>
            {props.tasks.map((task, index, arr) => {
                const className = (parentIDs.includes(task.id) && 'parentTask') ||
                                  (currentTaskID === task.id && 'currentTask') ||
                                  (childIDs.includes(task.id) && 'childTask')
                const z_index = (props.isSearching && (arr.length - index)) ||
                                (parentIDs.includes(task.id) && 1) ||
                                (currentTaskID === task.id && 1000) ||
                                (childIDs.includes(task.id) && (arr.length - index))
                return (
                    <Task key={task.id} className={`${className}`} z_index={z_index}
                    task={task} 
                    // family={family}
                    selectTask={props.selectTask}
                    completeTask={props.completeTask}/>
                )
            })}
        </div>
    )
}