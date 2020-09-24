import React from 'react';
import useLogin from '../hooks/useLogin';

export default function Login() {
    const [ username, setUsername, setPassword, error, submitLogin ] = useLogin();

    return (
        <>
            <h1>LizarDOS green_brother_app</h1>
            <div className="small-form">
                <form onSubmit={event => submitLogin(event)}>
                    <input
                        name="username"
                        placeholder="Username"
                        type="text"
                        defaultValue={username}
                        onChange={event => {
                            setUsername(event.target.value);
                        }}
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={event => {
                            setPassword(event.target.value);
                        }}
                    />
                    {error ? <p className="error-message">{error}</p> : null}
                    <button type="submit">Sign in</button>
                </form>
            </div>
        </>
    );
}