import React from 'react'
import UserForm from './UserForm'
import TaskContent from './TaskContent'

export default function TaskDisplay(props) {
    return (
        <div className="TaskDisplay">
            <UserForm
            user={props.user} 
            login={props.login}
            register={props.register}
            logout={props.logout}/>
            
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
            />
        </div>
    )
}