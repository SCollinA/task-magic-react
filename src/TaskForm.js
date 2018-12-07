import React from 'react'

export default function TaskForm(props) {
    return (
        <form className="TaskForm" onSubmit={props.onSubmit} onReset={props.onReset}>
            <h1 onClick={() => props.editTask(props.currentTask)}>{props.currentTask ? props.currentTask.name : 'Login -->'}</h1>
            <input
                value={props.searchTerm} 
                onChange={props.onChange} 
                type='text'
                placeholder='Input Task'
            />
            <input type='submit' value='add'/>
            <input type="reset" value="reset"/>
        </form>
    )
}
