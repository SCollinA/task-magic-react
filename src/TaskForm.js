import React from 'react'

export default function TaskForm(props) {
    return (
        <form className="TaskForm" onSubmit={props.onSubmit}>
            <h1>{props.task ? props.task.name : 'Login -->'}</h1>
            <input
                value={props.searchTerm} 
                onChange={props.onChange} 
                type='text'
                placeholder='Input Task'
            />
            <input type='submit' value='add'/>
        </form>
    )
}
