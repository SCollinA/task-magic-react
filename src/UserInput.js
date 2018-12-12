import React from 'react'
import UserLogin from './UserLogin'
import TaskSearch from './TaskSearch'

export default function UserInput(props) {
    return (
        <div className='UserInput'>
            <UserLogin 
            user={props.user}
            login={props.login}
            register={props.register} 
            logout={props.logout}/>
            
            <TaskSearch/>
        </div>
    )
}