import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';
import axios from './api/axios';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const { setAuth } = useContext(AuthContext);
    const LOGIN_URL = '/auth';

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

        // main logic
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            // clear and password field once submitted
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            setAuth({ user, pwd, accessToken });
            setPwd("");
            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server response");
            }
            else if (err?.response.status === 400) {
                setErrMsg("Missing username or password");
            }
            else if (err?.response.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg(err.response);
            }

            errRef.current.focus();

        }

    };

    return (
        <div>
            {success ? (
                <section className='app-form'>
                    <h1> You are logged in as {user}</h1>
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