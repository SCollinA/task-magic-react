import React from 'react'

export default function TaskHeader(props) {
    const userLogin = props.user ? (
            <div className="UserLogin">
                {props.user.name}
                <button onClick={props.logout}>Logout</button>
            </div>
    ) : (
        <form className="UserLogin" onSubmit={props.login}>
            <label name="username">Username:</label>
            <input type="text" name="username"></input>
            <label name="password">Password:</label>
            <input type="password" name="password"></input>
            <input type="submit" value="Login"/>
        </form>
    )
    return (
        <div className="TaskHeader">
            {userLogin}
        </div>
    )
}