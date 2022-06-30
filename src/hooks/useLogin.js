import { useState,useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = ()=>{
  const [cancelled,setCancelled] = useState(false)
  const [error,setError] = useState(null)
  const [pending,setPending] = useState(false)
  const {dispatch } = useAuthContext()

  const login = async (email,password)=>{
    setError(null)
    setPending(true)

    try{
      const response =   await projectAuth.signInWithEmailAndPassword(email,password)

      dispatch({type:'LOGIN',payload: response.user})
      //update state


      
        
        setPending(false)
        setError(null)
      
     
    }
    catch(err){
      
      console.log(err.message)
      setError(err.message)
      setPending(false)
    
  }
  }

 

  return{login,error,pending}
}