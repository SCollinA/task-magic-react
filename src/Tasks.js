import React from 'react'
import Task from './Task'

export default function Tasks(props){
    return (
        <div className="Tasks">
            {props.children.map(child => {
            return (
            <Task
            task={props.taskToEdit && child.id == props.taskToEdit.id ? {...child, name: props.taskToEdit.name} : child} 
            key={child.id} 
            selectTask={props.selectTask}
            editTask={props.editTask}
            completeTask={props.completeTask}
            deleteTask={props.deleteTask} 
            className={''}
            />
            )})}
            {props.parents.map(parent => {
            return (
            <Task
            task={parent} 
            key={parent.id} 
            selectTask={props.selectTask}
            editTask={props.selectTask}
            completeTask={props.completeTask}
            deleteTask={props.deleteTask} 
            className={'parent'/* this adds the parent class*/}
            />
            )})}
        </div>
    )
}