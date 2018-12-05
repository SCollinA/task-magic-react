import React from 'react'
import Task from './Task'

export default function Tasks(props){
    return (
        <div className="Tasks">
            {props.tasks.filter(task => task.name.includes(props.searchTerm))
            .map(task => {
            return (
            <Task
            task={task} 
            key={task.id} 
            selectTask={props.selectTask}
            completeTask={props.completeTask}
            deleteTask={props.deleteTask} 
            searchTerm={props.searchTerm}
            selectedTask={props.selectedTask}
            />
            )})}
        </div>
    )
}