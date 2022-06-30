import { useEffect,useRef,useState } from "react"
import { projectFireStore } from "../firebase/config"

export const useCollection =(collection,_query,_oder)=>{
  const [document,setDocument] = useState(null)
  const [error,setError] = useState(null)
  const query = useRef(_query).current  
  const order= useRef(_oder).current
  useEffect(()=>{ 

      

    let ref = projectFireStore.collection(collection)
    if(query){
      ref=ref.where(...query)
    }
    if(order){
      ref=ref.orderBy(...order)
    }
    const unsub = ref.onSnapshot((snapshot)=>{
      
        let result = []
        snapshot.docs.forEach((doc)=>{
          result.push({...doc.data(),id:doc.id})
        })

        //update state

        setDocument(result)
        setError(null)
      }, (error)=>{
      console.log(error)
      setError('could not fetch data')
    })

    return()=> unsub()

  },[collection])

  return{document,error}
}