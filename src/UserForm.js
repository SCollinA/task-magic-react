import React from 'react'

export default function UserForm(props) {
    const userLogin = 
    <form className="UserForm hackerStyle header" 
    onSubmit={props.login}>
        {props.user ? (
            <>
                <h6>{props.user.name}</h6>
                <button onClick={props.logout}>Logout</button>
            </>
        ) : (
            <>
                <label name="username">
                    Username:<input type="text" name="username"/>
                </label>
                <label name="password">
                    Password:<input type="password" name="password"/>
                </label>
                <div className='loginRegister'>
                    <input type="submit" value="login" name="login"/>
                    |
                    <input type="button" 
                    value="register" 
                    name="register"
                    onClick={props.register}/>
                </div>
            </>
        )}
        </form>
    
    return userLogin
}