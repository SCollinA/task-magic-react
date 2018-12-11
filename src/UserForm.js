import React from 'react'

export default function UserForm(props) {
    const userLogin = props.user ? (
            <div className="UserForm hackerStyle header stickyContain">
                <h6>{props.user.name}</h6>
                <button onClick={props.logout}>Logout</button>
            </div>
    ) : (
        <form className="UserForm hackerStyle header stickyContain" onSubmit={props.login}>
            <label name="username">Username:</label>
            <input type="text" name="username"></input>
            <label name="password">Password:</label>
            <input type="password" name="password"></input>
            <div className='loginRegister'>
                <input type="submit" value="login" name="login"/>
                |
                <input type="button" 
                value="register" 
                name="register"
                onClick={props.register}/>
            </div>
        </form>
    )
    return userLogin
}