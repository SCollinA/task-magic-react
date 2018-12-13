import React from 'react'

export default function TaskShare(props) {
    return (
        <form className="TaskShare" 
        onSubmit={event => {
            event.preventDefault()
            props.shareTask()
        }}>
            <input type="text" 
            name='username' 
            placeholder='Enter user name'
            value={props.searchTerm} 
            onChange={props.updateSearch}/>
            <div className="shareButtons">
                <input type="reset" value="reset"/>
                <input type="submit" value="share"/>
            </div>
        </form>
    )
}