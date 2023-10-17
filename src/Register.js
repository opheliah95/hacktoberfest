import { useRef, useState, useEffect } from "react";
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#\$%]).{8,}$/;

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
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form>
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
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Need to be 4 to 24 characters.
                        <br />
                        Must begin with a letter.
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
                            pwdFocus && user && !validPwd
                                ? "instructions"
                                : "offscreen"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
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
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p
                        id="confirmnote"
                        className={
                            matchFocus && !validMatch
                                ? "instructions"
                                : "offscreen"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Your Password does not match
                    </p>
                </div>
            </form>
        </section >
    )
}

export default Register;