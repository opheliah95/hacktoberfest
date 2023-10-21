import { useRef, useState, useEffect } from "react";
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import axios from './api/axios'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#\$%]).{8,}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    // check if user is valid
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    // check if password is valid
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    // check if password is matching
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    // output error message
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // set user focus
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation check
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid information entered");
            console.log(errMsg);
            return;
        }

        // handling axios
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify(user, pwd),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
            // return success
            setSuccess(true);
            console.log(`successfully registed ${user}`);
            console.log(response.data);

        } catch (err) {
            if (!err.response) {
                setErrMsg("No server response");
                return
            } else if (err.response?.status === 409) {
                setErrMsg("username taken");
                return
            }
            setErrMsg(err);
            console.log(`There is an error ${err}`);
        }
    }

    // update user value
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    // update passwprd
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    // set error message
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])


    return (
        <> {
            success ? (
                <section className="app-form">
                    <h1>Thanks for signing up.</h1>
                    <p>Your account has been created!</p>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>) : (
                <section className="app-form">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="labelField" >
                            <label htmlFor="username">
                                Username:
                                <span className={validName ? "valid" : "hide"} >
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validName || !user ? "hide" : "invalid"} >
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p
                                id="uidnote"
                                className={
                                    userFocus && user && !validName
                                        ? "instructions"
                                        : "offscreen"
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle}
                                    style={{ marginRight: "0.5em" }} />
                                Username needs to be 4 to 24 characters.
                                <br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </div>
                        <div className="labelField">
                            <label htmlFor="password">
                                Password:
                                <span className={validPwd ? "valid" : "hide"} >
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validPwd || !pwd ? "hide" : "invalid"} >
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                autoComplete="off"
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p
                                id="uidnote"
                                className={
                                    pwdFocus && !validPwd
                                        ? "instructions"
                                        : "offscreen"
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle}
                                    style={{ marginRight: "0.5em" }} />
                                Your Password needs to be 8 characters at least
                                <br />
                                Must contain at least a number and !@$%
                            </p>
                        </div>
                        <div className="labelField">
                            <label htmlFor="confirm_password">
                                Re-enter Password:
                                <span className={matchPwd && validMatch ? "valid" : "hide"} >
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={matchPwd && validMatch ? "hide" : "invalid"} >
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                id="match_password"
                                autoComplete="off"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p
                                id="uidnote"
                                className={
                                    matchFocus && !validMatch
                                        ? "instructions"
                                        : "offscreen"
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle}
                                    style={{ marginRight: "0.5em" }} />
                                Your Password does not match
                            </p>
                        </div>
                        <div className="labelField">
                            <button disabled={!validName || !validPwd || !validPwd}> Sign Up</button>
                        </div>
                        <div className="labelField">
                            <div className="signin">
                                <p>Having an account? </p>
                                <p><a href="#">Log In</a> Here!</p>
                            </div>
                        </div>
                    </form>
                </section >
            )
        }
        </>

    )
}

export default Register;