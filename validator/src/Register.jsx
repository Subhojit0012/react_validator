import { useRef, useState, useEffect } from "react";
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const USER_REGX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const PWD_REGX = /^(?=.*[a-z])(?.*[A-Z])(?.*[0-9])(?.*[!@#$%]).{8,24}$/

import React from 'react'

function Register() {
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [successs, setSuccess] = useState(false);

    useEffect(()=> {
        useRef().current.focus()
    }, [])

    useEffect(()=>{
        const result = USER_REGX.test(user)
        console.log(result);
        console.log(user);
        setValidName(result)
    }, [user])

    useEffect(()=> {
        const result = PWD_REGX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(()=> {
        setErrMsg('');
    }, [user, pwd, matchPwd])

  return (
    <section>
      <p ref={errRef} className={errMsg? 'errmsg':'offscreen'} aria-live="assertive">{errMsg}</p>
      <h1>Regoster</h1>
      <form>
        <label htmlFor="username">
            Username:
            <span className={validName? "valid": "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validName || !user ? "hide": "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
        </label>
        <input type="text" id="username" autoComplete="off" onChange={e=> setUser(e.target.value)} required aria-invalid={validName? "false":"true"} aria-describedby="uidnote" onFocus={()=> setUserFocus(true)} onBlur={()=> setUserFocus(false)}/>
        <p id="uidnote" className={userFocus && user && !validName ? "instructions":"offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters <br />
            Must being with a letter. <br />
            Letters, numbers, underscores, hyphens allowed.
        </p>
      </form>
    </section>
  )
}

export default Register