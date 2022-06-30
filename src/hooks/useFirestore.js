import { useReducer,useEffect,useState } from "react";
import { projectFireStore,timestamp } from "../firebase/config";
let initialState = {
  document:null,
  pending: false,
  error: null,
  success: null 
}
const firestoreReducer=(state,action)=>{
  switch(action.type){
    case 'PENDING':
      return {pending: true,document:null,success:null,error:null}   
    case 'ADDED_DOCUMENT':
      return{pending: false, document: action.payload ,success:true,error:null}
    case 'ERROR':
      return{pending:false,document:null,success:false,error:action.payload}
    case 'DELETED':
      return{pending:false,document:action.payload,success:true,error:null}
    default:
      return state
  }
}
export const useFirestore = (collection)=>{
  const [response,dispatch] = useReducer(firestoreReducer, initialState)
  const [cancelled,setCancelled] = useState(false)
  

  //collection ref

  //only dispatch if not cancelled
  const dispatchifNotCancelled=(action)=>{
    if(!cancelled){
      dispatch(action)
    }
  } 


  const ref= projectFireStore.collection(collection)
  // add document
  const addDocument = async(doc)=>{
    dispatch({type: 'PENDING'})

    try{
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({...doc,createdAt})
      dispatchifNotCancelled({type: 'ADDED_DOCUMENT',payload: addedDocument})
      
    }
    catch(err){
      dispatchifNotCancelled({type:'ERROR',payload: err.message})
    }
  }

  //delete document
  const deleteDocument = async(id)=>{
    dispatch({type:'PENDING'})

    try{
      const deletedDocument = await ref.doc(id).delete()
      dispatchifNotCancelled({type:'DELETED' , payload: deletedDocument})
    }
    catch(err){
      dispatchifNotCancelled({type:'ERROR', payload: 'could not delete'})
    }
  }

  useEffect(()=>{
    return ()=> setCancelled(true)
  },[])

  return {addDocument,deleteDocument,response}
}