import React from 'react'
import Task from './Task'

export default function Tasks(props){
    return (
        <div className="Tasks">
            {props.children.map(child => {
            return (
            <Task
            task={child} 
            key={child.id} 
            selectTask={props.selectTask}
            completeTask={props.completeTask}
            deleteTask={props.deleteTask} 
            parent={''}
            />
            )})}
            {props.parents.map(parent => {
            return (
            <Task
            task={parent} 
            key={parent.id} 
            selectTask={props.selectTask}
            completeTask={props.completeTask}
            deleteTask={props.deleteTask} 
            parent={'parent'}
            />
            )})}
        </div>
    )
}