import { useState,useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = ()=>{
  const [cancelled,setCancelled] = useState(false)
  const [error,setError] = useState(null)
  const [pending,setPending] = useState(false)
  const {dispatch } = useAuthContext()

  const logout = async ()=>{
    setError(null)
    setPending(true)

    try{
      await projectAuth.signOut()

      dispatch({type:'LOGOUT'})
      //update state

    
        setPending(false)
        setError(null)
  
     
    }
    catch(err){
      
      console.log(err.message)
      setError(err.meassage)
      setPending(false)
   
  }
  }

  return{logout,error,pending}
}