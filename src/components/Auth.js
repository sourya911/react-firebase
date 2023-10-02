import {useState} from 'react'
import { auth ,googleProvider } from "../config/firebase"
import {createUserWithEmailAndPassword,signInWithPopup, signOut} from 'firebase/auth'  //method of authentication chosen

export const Auth = () => {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

  
    const signIn= async()=>{
        try{
        await createUserWithEmailAndPassword(auth,email,password)
    
    }
    catch(err){
        console.error(err)
    }
}

    const signInGoogle= async()=>{
        try{
        await signInWithPopup(auth,googleProvider)
    
    }
    catch(err){
        console.error(err)
    }
}

    const Logout= async()=>{
        try{
        await signOut(auth)
    
    }
    catch(err){
        console.error(err)
    }
}

  return (
    <div>
        <input type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Enter Password"
        onChange={(e)=>setPassword(e.target.value)}/>

        <button type="submit" onClick={signIn}>Sign In</button>

        <button type="submit" onClick={signInGoogle}>Sign In with Google</button>
        <button onClick={Logout}>Sign out</button> 
        {/* this can logout current user  */}
    </div>
  )
}
