import React from 'react'
import Task from './Task'
import TaskSearch from './TaskInput'

export default function TaskList(props){
    return (
        <div className={`TaskList`}>
            {props.parents && props.parents.map(parent => {
                return (
                <Task
                task={parent} 
                key={parent.id} 
                selectTask={props.selectTask}
                editTask={props.selectTask}
                completeTask={props.completeTask}
                deleteTask={props.deleteTask} 
                className={'parent'/* this adds the parent class*/}
                currentChildren={props.currentChildren}
                />)
            })}
            {props.currentTask && (
                <Task 
                task={props.currentTask}
                />
            )}
            {props.user && (
            <TaskSearch
            searchTerm={props.searchTerm} 
            onSubmit={props.onSubmit} 
            editTask={props.editTask}
            completeTask={props.completeTask}
            onChange={props.onChange}
            currentTask={props.currentTask}
            currentChildren={props.currentChildren}
            onReset={props.onReset}
            />)}
            {props.children && props.children.map((child, index, arr) => {
                return (
                <Task
                // task={child}
                task={props.taskToEdit && child.id === props.taskToEdit.id ? {...child, name: props.taskToEdit.name} : child} 
                z_index={arr.length - index} 
                key={child.id} 
                currentTask={props.currentTask}
                selectTask={props.selectTask}
                editTask={props.editTask}
                completeTask={props.completeTask}
                subTask={props.subTask}
                deleteTask={props.deleteTask} 
                className={props.taskToEdit && child.id === props.taskToEdit.id ? 'selectedTask' : ''}
                isSearching={props.isSearching}
                currentChildren={props.currentChildren}
                />)
            })}
        </div>
    )
}