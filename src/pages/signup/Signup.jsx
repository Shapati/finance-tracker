import styles from './Signup.module.css'
import { useSignup } from '../../hooks/useSignup'
import { useState } from 'react'
export const Signup = ()=>{

  const [display,setDisplay] = useState('')
  const [email,setEmail]= useState('')
  const [password,setPassword] = useState('')
  const {signup,error,pending} = useSignup()

  const handleSubmit=(e)=>{
    e.preventDefault()
    signup(email,password,display)
  }

  return(
    <form className={styles['signup-form']} onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>display name:</span>
        <input 
        type="text" 
        onChange={(e)=>setDisplay(e.target.value)}
        value={display}
        />
      </label>
      <label>
        <span>email:</span>
        <input 
        type="email" 
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input 
        type="password" 
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        />
      </label>

      {!pending && <button className='btn'>Sign up</button> }
      {pending && <button className='btn' disabled>loading...</button>}
      {error && <p>{error}</p>}
    </form>
  )
}