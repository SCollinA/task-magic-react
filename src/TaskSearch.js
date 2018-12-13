import React from 'react'

export default function TaskSearch(props) {
    return (
        <form className={`TaskSearch`} onSubmit={props.searchSubmit} onReset={props.onReset} autoComplete='off'>
            <input type='text' 
            name='taskInput' 
            placeholder={props.prompt} 
            value={props.searchTerm} 
            onChange={props.updateSearch}/>
            <div className='searchButtons'>
                <input type='reset' value='reset'/>
                <input type='submit' value='submit'/>
            </div>
        </form>
    )
}
