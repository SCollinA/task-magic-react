import React from 'react'

export default function TaskForm(props) {
    return (
        // <form className="TaskForm" onSubmit={props.onSubmit}>
        <form className="TaskForm" onSubmit={props.onSubmit} onReset={props.onReset}>
            <h1 onClick={() => props.editTask(props.currentTask)}>{props.currentTask ? props.currentTask.name : 'Login -->'}</h1>
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
