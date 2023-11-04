// login Page
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AUTH_ACTIONS } from '../redux/action'
// Redux

const LoginPage = () => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.auth.loading)
    const error = useSelector(state => state.auth.error)
    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.auth.user)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = () => {
        dispatch({ type: AUTH_ACTIONS.LOGIN, username: userName, password: password })
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
    }
    return (
        <div>
            <input type="text" placeholder="username" onChange={(e) => setUserName(e.target.value)} />
            <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            {
                loading ? <p>Loading...</p> : <button onClick={() => dispatch({ type: AUTH_ACTIONS.LOGIN, username: userName, password: password })}>Login</button>
            }
            {error}
        </div>
    )
}
export default LoginPage