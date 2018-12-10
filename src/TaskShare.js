import React from 'react'

export default function TaskShare(props) {
    return (
        <form className="TaskShare" onSubmit={event => {
            event.preventDefault()
            props.shareTask(event.target.username.value)
        }}>
            <input type="text" name='username' placeholder='Enter user name'/>
            <input type="submit" value="submit"/>
        </form>
    )
}