import styles from './Login.module.css'
import {useLogin} from '../../hooks/useLogin'
import { useState } from 'react'
export const Login=()=>{

  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const {login,error,pending} = useLogin()
  const handleSubmit=(e)=>{
    e.preventDefault()
    setEmail('')
    setPassword('')
    login(email,password)
  }

  return(
    <form className={styles['login-form']} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input 
        type="email"
        onChange={(e)=>setEmail(e.target.value)} 
        value={email} />
      </label>
      <label >
        <span>password:</span>
        <input 
        type="password" 
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        />
      </label>
      {!pending && <button className='btn'>Login</button> }
      {pending && <button className='btn' disabled>loading</button>}
      {error && <p>{error}</p>}
    </form>
  )
}