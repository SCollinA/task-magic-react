import React from 'react'
import Task from './Task'

export default function Tasks(props){
    return (
        <div className={`Tasks`}>
            {props.parents.map(task => {
                return (
                    <Task key={task.id} className='parentTask' 
                    task={task} 
                    family={[...props.parents, props.currentTask, ...props.children]}
                    selectTask={props.selectTask}
                    completeTask={props.completeTask}/>
                )
            })}

            <Task key={props.currentTask.id} className='currentTask' 
            task={props.currentTask} 
            family={[...props.parents, props.currentTask, ...props.children]}
            selectTask={props.selectTask}
            completeTask={props.completeTask}
            />

            {props.children.map(task => {
                return (
                    <Task key={task.id} className='childTask' 
                    task={task} 
                    family={[...props.parents, props.currentTask, ...props.children]}
                    selectTask={props.selectTask}
                    completeTask={props.completeTask}/>
                )
            })}

            {props.searchTasks.map(task => {
                return (
                    <Task key={task.id} className='searchTask' 
                    task={task} 
                    family={[...props.parents, props.currentTask, ...props.children]}
                    selectTask={props.selectTask}
                    completeTask={props.completeTask}/>
                )
            })}
        </div>
    )
}