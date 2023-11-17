import React, {useRef, useState, useEffect} from 'react';


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    // list of states
    const [user, setUser] = useState('');
    const[pwd, setPwd] = useState('');
    const[errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // this runs on every render
    useEffect(()=>{
        userRef.current.focus();
    }, []);

    useEffect(()=> {
        setErrMsg(''); // alaways clean err message
    }, [user, pwd]);

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive">{errMsg}</p>
            <h1>Sign in</h1>
            <form>
                
            </form>
        </section>
    )


}
    


export default Login;