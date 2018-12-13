import React from 'react'

export default function UserLogout(props) {
    return (
        <div className='UserLogout hackerStyle stickyContain'>
            <h1>{props.user && props.user.name}</h1>
            <input type="button" value="logout" onClick={props.logout}/>
        </div>
    )
}