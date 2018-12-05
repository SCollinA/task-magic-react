import React from 'react'
import Task from './Task'

export default function Tasks(props){
    const selectedTask = props.selectedTask ? <Task task={props.selectedTask}
    key={props.selectedTask.id}
    selectTask={props.selectTask}
    completeTask={props.completeTask}
    deleteTask={props.deleteTask} 
    searchTerm={props.searchTerm}
    selectedTask={props.selectedTask}
    id="Selected"
    /> : null
    return (
        <div className="Tasks">
            {selectedTask}
            {props.tasks.filter(task => task.name.includes(props.searchTerm) && (!props.selectedTask || props.selectedTask && task.id !== props.selectedTask.id))
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