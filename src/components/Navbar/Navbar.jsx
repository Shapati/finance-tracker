import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import {useLogout} from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
export const Navbar = ()=>{
  const {user} = useAuthContext()
  const {logout}= useLogout()
  return(
   <nav className={styles.navbar}>
     <ul>
       <li className={styles.title}>MyMoney</li>

       {!user && (

      
       <>
       
       <li><Link to='/login'>Login</Link></li>
       <li><Link to='/signup'>Sign up</Link></li>

       </>
      )}

      {user && (
        <>
        <li>hello, {user.displayName}</li>
        <li>

             <button className='btn' onClick={logout}>Logout</button>

        </li>

          </>
      )}
        
      
     
     </ul>
   </nav>
  )
}