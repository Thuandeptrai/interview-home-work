import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { REGISTER_ACTIONS } from '../redux/action'


export default function RegisterPage() {
  const disPatch = useDispatch()
  // get Error from redux store
  const error = useSelector(state => state.register.error)
  const loading = useSelector(state => state.register.loading)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState('')
  const [name, setName] = useState('')
  return (<>
    <div>
    <input type="text" placeholder="username" onChange={(e) => setUserName(e.target.value)} />
    <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
    <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
    <input type="text" placeholder="dob" onChange={(e) => setDob(e.target.value)} />
    {
      loading ? <p>Loading...</p> : <button onClick={() => disPatch({ type: REGISTER_ACTIONS.REGISTER, username: userName, name: name, password: password, dob: dob })}>Register</button>
    }
    {error}
  </div>
    </>
  )
}
