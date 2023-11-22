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

    // handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        // clear and password field once submitted
        setPwd("");
        setSuccess(true);
    };

    return (
        <div>
            {success ? (
                <section className='app-form'>
                    <h1> Welcome {user} !</h1>
                    <br />
                    <p>Go to <a href="#"> Home</a></p>
                </section>

            ) : (
                <section className='app-form'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive">{errMsg}</p>
                    <h1>Sign in</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="labelField">
                            <label typeof='username'>Username:</label>
                            <input id='username' ref={userRef}
                                autoComplete='off'
                                onChange={(e) => {
                                    setUser(e.target.value)
                                }}
                                value={user}
                                required />
                        </div>
                        <div className="labelField">
                            <label typeof='password'>Password:</label>
                            <input type="password"
                                id="password"
                                onChange={(e) => {
                                    setPwd(e.target.value)
                                }}
                                value={pwd}
                                required />
                        </div>
                        <div className="labelField">
                            <button>Sign In</button>
                        </div>
                        <div className="labelField">
                            <div className="signin">
                                <p>Don't have an account? </p>
                                <p><a href="#">Sign up</a> Here!</p>
                            </div>
                        </div>
                    </form>
                </section>
            )}
        </div>

    );


}



export default Login;