import React from 'react'
import Task from './Task'

export default function TaskForm(props) {
    return (
        // <form className="TaskForm" onSubmit={props.onSubmit}>
        <form className={`TaskForm hackerStyle ${props.className}`} 
        style={props.style}
        onSubmit={props.onSubmit} 
        onReset={props.onReset}>
            {(
                props.currentTask 
                && 
                <Task className='currentTask'
                id={props.currentTask && props.currentTask.id} 
                task={props.currentTask} 
                isCurrentTask={true}
                editTask={() => props.editTask(props.currentTask)}
                // selectTask={() => props.editTask(props.currentTask)}
                completeTask={() => props.completeTask(props.currentTask)}
                currentChildren={props.currentChildren}/>
            )
            ||
                <h2>Login --></h2>
            }
            {/* <h1 onClick={() => props.editTask(props.currentTask)}>{props.currentTask ? props.currentTask.name : 'Login -->'}</h1> */}
            {props.currentTask && (
            <div className="searchTasks">
                <div className="taskInput">
                    <label name="inputTask">Input Task:</label>
                    <input
                    value={props.searchTerm} 
                    onChange={props.onChange} 
                    type='text'
                    name='inputTask'
                    />
                {/* <input type='submit' value='add'/> */}
                {/* <button onClick={props.onReset}>Cancel</button> */}
                </div>
                <button type="reset">Cancel</button>
                {/* <input type="reset" value="reset"/> */}
            </div>
            )}
        </form>
    )
}
