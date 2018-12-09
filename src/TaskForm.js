import React from 'react'
import Task from './Task'

export default function TaskForm(props) {
    return (
        // <form className="TaskForm" onSubmit={props.onSubmit}>
        <form className="TaskForm" onSubmit={props.onSubmit} onReset={props.onReset}>
            {(
                props.currentTask 
                && 
                <Task className='currentTask' id={props.currentTask && props.currentTask.id} 
                task={props.currentTask} 
                currentTask={true}
                selectTask={() => props.editTask(props.currentTask)}
                completeTask={() => props.completeTask(props.currentTask)}/>
            )
            ||
                <h1>Login --></h1>
            }
            {/* <h1 onClick={() => props.editTask(props.currentTask)}>{props.currentTask ? props.currentTask.name : 'Login -->'}</h1> */}
            <div className="searchTasks">
                <input
                    value={props.searchTerm} 
                    onChange={props.onChange} 
                    type='text'
                    placeholder='Input Task'
                />
                {/* <input type='submit' value='add'/> */}
                {/* <button onClick={props.onReset}>Cancel</button> */}
                <button type="reset">Cancel</button>
                {/* <input type="reset" value="reset"/> */}
            </div>
        </form>
    )
}
