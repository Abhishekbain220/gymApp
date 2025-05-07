import axios from "./axios";
import { createContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";

export let AdminContext=createContext()
export let AdminProvider=(props)=>{
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState(null)
    let [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null);

    let logout=async()=>{
        try {
            let {data}=await axios.get("/user/logout")
            localStorage.removeItem("authToken");
            setToken(null)
            setIsOpen(false)
            toast.success(data.message)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        let storeToken = JSON.parse(localStorage.getItem("authToken"))
        setToken(storeToken)

    }, [])
    return(
        <AdminContext.Provider value={{user, setUser,loading, setLoading,isOpen, setIsOpen,username, setUsername,email, setEmail,password, setPassword,token,setToken,logout}}>
            {props.children}
        </AdminContext.Provider>
    )
}