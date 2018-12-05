import React from 'react'

export default function TaskForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
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
