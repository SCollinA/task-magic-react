import React from 'react'
import UserForm from './UserForm'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

export default function TaskContent(props) {
    return (
        <div className='TaskContent'>

`           <UserForm
            user={props.user} 
            login={props.login}
            register={props.register}
            logout={props.logout}/>

            {props.user && (
            <TaskForm className={props.className}
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