import {useRef, useState, useEffect} from "react";
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#\$%]).{8,}$/;

const Register = () => {
    const userRef = userRef();
    const errRef = userRef();

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

    useEffect(() =>{
        userRef.current.focus();
    }, [])
    return (
        <div>

        </div>
    )
}

export default Register;