import React from 'react'

export default function TaskEdit(props) {
    return (
        <form className={`TaskEdit`} 
        onSubmit={event => {
            event.preventDefault()
            props.editTask()
        }} 
        onReset={props.onReset} 
        autoComplete='off'>
            <input type='text' 
            name='taskName' 
            placeholder={`${props.task.name}`} 
            value={`${props.searchTerm}`} 
            onChange={props.updateSearch}/>
            <div className='addTaskButtons'>
                <input type='reset' value='reset'/>
                <input type='submit' value='update'/>
            </div>
        </form>
    )
}