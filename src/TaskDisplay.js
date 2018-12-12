import React from 'react'
import UserForm from './UserForm'
import TaskList from './TaskList'

export default function TaskDisplay(props) {
    return (
        <div className="TaskDisplay">
            <UserForm
            user={props.user} 
            login={props.login}
            register={props.register}
            logout={props.logout}/>

            {props.user && (
            <TaskList
            user={props.user}
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
            searchTerm={props.searchTerm} 
            onSubmit={props.onSubmit} 
            onChange={props.onChange}
            onReset={props.onReset}
            />)}
        </div>
    )
}