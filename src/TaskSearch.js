import React from 'react'

export default function TaskSearch(props) {
    return (
        <form className={`TaskSearch`} 
        style={props.style}
        onSubmit={props.onSubmit} 
        onReset={props.onReset}>
            <div className="taskInput hackerStyle">
                <label name="inputTask">
                    Input Task:<input
                    value={props.searchTerm} 
                    onChange={props.onChange} 
                    type='text'
                    name='inputTask'
                    />
                </label>
            </div>
            <button className="hackerStyle" type="reset">Cancel</button>
        </form>
    )
}
