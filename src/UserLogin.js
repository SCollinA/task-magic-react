import React from 'react'

export default function UserLogin(props) {
    return (
        <form className={`UserLogin hackerStyle${(props.user && ' loggedIn') || ''}`}
        onSubmit={props.login}>
            {(props.user && (
                <>
                    <h1>{props.user.name}</h1>
                    <input type="button" value="logout" onClick={props.logout}/>
                </>
            )) || (
                <>
                    <label>Username:<input type='text' name="username"/></label>
                    <label>Password:<input type='password' name="password"/></label>
                    <div className='loginButtons'>
                        <input type="submit" value="login"/>
                        <p>|</p>
                        <input type="button" value="register" onClick={props.register}/>
                    </div>
                </>
            )}
        </form>
    )
}