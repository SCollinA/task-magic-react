import React from 'react'

export default function TaskSearch(props) {
    return (
        <form className={`TaskSearch`} 
        onReset={props.onReset} 
        autoComplete='off'>
            <input type='text' 
            name='taskInput' 
            placeholder={'search task names'} 
            value={props.searchTerm} 
            onChange={props.updateSearch}/>
            <div className='searchButtons'>
                <input type='reset' value='reset'/>
            </div>
        </form>
    )
}
