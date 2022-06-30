import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
export const useSignup = ()=>{
  const [cancelled,setCancelled] = useState(false)
  const [error,setError] = useState(null)
  const [pending,setPending]= useState(false)
  const {dispatch} = useAuthContext()
  const signup = async (email,password,displayName) =>{

    setError(null)
    setPending(true)

    try{
      const response = await projectAuth.createUserWithEmailAndPassword(email,password)
      if(!response){
        throw new Error('couldnt complete sign up')
      }
      await response.user.updateProfile({displayName})

      //dispatch login
     
      dispatch({type:'LOGIN' , payload: response.user})
   
      
        setPending(false)
        setError(null)
      
    }
    catch(err){ 
     
        console.log(err.message)
        setError(err.message)
        setPending(false)
      
    } 

  } 



  return{error,pending,signup}

}

