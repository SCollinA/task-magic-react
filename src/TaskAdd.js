import React from 'react'

export default function TaskAdd(props) {
    return (
        <form className={`TaskAdd`} 
        onSubmit={props.addTask} 
        onReset={props.onReset} 
        autoComplete='off'>
            <input type='text' 
            name='taskInput' 
            placeholder={'new task name'} 
            value={props.searchTerm} 
            onChange={props.updateSearch}/>
            <div className='addTakButtons'>
                <input type='reset' value='reset'/>
                <input type='submit' value='add task'/>
            </div>
        </form>
    )
}