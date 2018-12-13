import React from 'react'
import Task from './Task'

export default function Tasks(props) {
    const family = [...props.parents, props.currentTask, ...props.children]
    return (
        <div className={`Tasks`}>
            {(!props.searchTasks && 
               <>{props.parents.map(task => {
                    return (
                        <Task key={task.id} className='parentTask' 
                        task={task} 
                        family={family}
                        selectTask={props.selectTask}
                        completeTask={props.completeTask}/>
                    )
                })}

                <Task key={props.currentTask.id} className='currentTask' 
                task={props.currentTask} 
                family={family}
                selectTask={props.selectTask}
                completeTask={props.completeTask}
                />

                {props.children.map(task => {
                    return (
                        <Task key={task.id} className='childTask' 
                        task={task} 
                        family={family}
                        selectTask={props.selectTask}
                        completeTask={props.completeTask}/>
                    )
                })}</>
            ) || (
                <>{props.searchTasks.map(task => {
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
                })}</>
            )
        }
        </div>
    )
}