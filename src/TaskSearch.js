import React from 'react'

export default function TaskSearch(props) {
    return (
        <form className={`TaskSearch stickyContain`} 
        style={props.style}
        onSubmit={props.onSubmit} 
        onReset={props.onReset}>
            <label className="taskInput hackerStyle"
            name="inputTask">
                Input Task:<input
                value={props.searchTerm} 
                onChange={props.onChange} 
                type='text'
                name='inputTask'
                />
            </label>
            <button className="hackerStyle" type="reset">Cancel</button>
        </form>
    )
}
