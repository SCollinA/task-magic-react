import React from 'react'
import TaskSearch from './TaskSearch'
import TaskList from './TaskList'

export default function TaskContent(props) {
    return (
        <div className='TaskContent stickyContain'>

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
            
            {props.user && (
            <TaskList
            children={props.children}
            currentChildren={props.currentChildren}
            parents={props.parents}
            currentTask={props.currentTask}
            selectTask={props.selectTask}
            subTask={props.subTask}
            editTask={props.editTask}
            completeTask={props.completeTask}
            deleteTask={props.deleteTask}
            taskToEdit={props.taskToEdit}
            isSearching={props.isSearching}
            />)}
        </div>
    )
}