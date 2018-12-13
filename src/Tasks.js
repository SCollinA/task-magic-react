import React from 'react'
import UserLogout from './UserLogout'
import Task from './Task'

export default function Tasks(props) {
    const family = [...props.parents, props.currentTask, ...props.children]
    return (
        <div className={`Tasks`}>
            <UserLogout user={props.user} logout={props.logout}/>
            {props.tasks.map((task, index, arr) => {
                const className = (props.parents.map(task => task.id).includes(task.id) && 'parentTask') ||
                                  (props.currentTask.id === task.id && 'currentTask') ||
                                  (props.children.map(task => task.id).includes(task.id) && 'childTask')
                return (
                    <Task key={task.id} className={`${className}`} z_index={1}
                    task={task} 
                    family={family}
                    selectTask={props.selectTask}
                    completeTask={props.completeTask}/>
                )
            })}
            {/* {props.parents.map((task, index, arr) => {
                return (
                    <Task key={task.id} className='parentTask' z_index={1}
                    task={task} 
                    family={family}
                    selectTask={props.selectTask}
                    completeTask={props.completeTask}/>
                )
            })}

            {(props.children.length !== 0 || props.parents.length !== 0) && (
            <Task key={props.currentTask.id} className='currentTask' z_index={1000}
            task={props.currentTask} 
            family={family}
            selectTask={props.selectTask}
            completeTask={props.completeTask}
            />)}

            {props.children.map((task, index, arr) => {
                return (
                    <Task key={task.id} className='childTask' z_index={arr.length - index}
                    task={task} 
                    family={family}
                    selectTask={props.selectTask}
                    completeTask={props.completeTask}/>
                )
            })} */}
            {/* {props.searchTasks.map(task => {
                const searchClass = (props.parents.map(task => task.id).includes(task.id) && 'parentTask') ||
                                    (props.currentTask.id === task.id && 'currentTask') ||
                                    (props.children.map(task => task.id).includes(task.id) && 'childTask') || ''
                return (
                    <Task key={task.id} className={`${searchClass} searchTask`}
                    task={task} 
                    family={family}
                    selectTask={props.selectTask}
                    completeTask={props.completeTask}/>
                )
            })} */}
        </div>
    )
}