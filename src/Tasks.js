import React from 'react'
import Task from './Task'

export default function Tasks(props){
    // const selectedTask = props.selectedTask ? <Task task={props.selectedTask}
    // key={props.selectedTask.id}
    // selectTask={props.selectTask}
    // completeTask={props.completeTask}
    // deleteTask={props.deleteTask} 
    // searchTerm={props.searchTerm}
    // selectedTask={props.selectedTask}
    // id="Selected"
    // /> : null
    return (
        <div className="Tasks">
            {/* {selectedTask} */}
            {props.children.filter(child => child.name.includes(props.searchTerm))
            .map(child => {
            return (
            <Task
            task={child} 
            key={child.id} 
            selectTask={props.selectTask}
            completeTask={props.completeTask}
            deleteTask={props.deleteTask} 
            searchTerm={props.searchTerm}
            />
            )})}
            {props.parents.filter(parent => parent.name.includes(props.searchTerm))
            .map(parent => {
            return (
            <Task
            task={parent} 
            key={parent.id} 
            selectTask={props.selectTask}
            completeTask={props.completeTask}
            deleteTask={props.deleteTask} 
            searchTerm={props.searchTerm}
            />
            )})}
        </div>
    )
}