import React from 'react'
import TaskHeader from './TaskHeader'
import TaskList from './TaskList'

export default function TaskDisplay(props) {
    return (
        <div className="TaskDisplay">
            <TaskHeader
            user={props.user} 
            login={props.login}
            register={props.register}
            logout={props.logout}
            searchTerm={props.searchTerm} 
            onSubmit={props.onSubmit} 
            editTask={props.editTask}
            completeTask={props.completeTask}
            onChange={props.onChange}
            currentTask={props.currentTask}
            currentChildren={props.currentChildren}
            onReset={props.onReset}
            />)}
{/*             
            <TaskContent
            user={props.user} 
            login={props.login}
            register={props.register}
            logout={props.logout}
            searchTerm={props.searchTerm} 
            onSubmit={props.onSubmit} 
            onChange={props.onChange}
            currentTask={props.currentTask}
            currentChildren={props.children}
            onReset={props.resetSearch}
            children={props.children}
            parents={props.parents}
            selectTask={props.selectTask}
            subTask={props.subTask}
            editTask={props.editTask}
            completeTask={props.completeTask}
            deleteTask={props.deleteTask}
            taskToEdit={props.taskToEdit}
            isSearching={props.isSearching}
            /> */}
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