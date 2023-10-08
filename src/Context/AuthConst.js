import React, { createContext, useReducer, useState } from 'react'
const AuthConst=createContext()

const initialState={isAuth:false,user:{}}
const reducer =(state,{type,payload})=>{

    switch(type){
        case "LOGED_IN":
            return{ isAuth:true ,user:payload.user ,isLoading:payload.isLoading}
            case "LOGED_OUT":
                return initialState
default :
return state            
    }
}

export default function AuthConstProvider({children}) {
    const [isLoading,setIsLoading]=useState(false)
    const [state,dispatch]=useReducer(reducer,initialState)

  return (
   <>

<AuthConst.Provider>

{children}
</AuthConst.Provider>
   </>
  )
}
export const useAuthContext=()=>useAuthContext(AuthConst)
