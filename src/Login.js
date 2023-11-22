import React, { useRef, useState, useEffect } from 'react';


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    // list of states
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // this runs on every render
    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg(''); // alaways clean err message
    }, [user, pwd]);

    return (
        <section className='app-form'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive">{errMsg}</p>
            <h1>Sign in</h1>
            <form className='labelField'>
                <label typeof='username'>Username:</label>
                <input id='username' ref={userRef}
                    autoComplete='off'
                    onChange={(e) => {
                        setUser(e.target.value)
                    }}
                    value={user}
                    required />
                <label typeof='password'>Password:</label>
                <input type="text"
                    id="password"
                    autoComplete='off'
                    onChange={(e) => {
                        setPwd(e.target.value)
                    }}
                    value={pwd}
                    required/>
            </form>
        </section>
    )


}



export default Login;