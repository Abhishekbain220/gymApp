import axios from "./axios";
import { createContext, useContext, useState } from "react";
import React from "react";
import { AdminContext } from "./AdminContext";
import { toast } from "react-toastify";

export let MemberContext = createContext()
export let MemberProvider = (props) => {
    let {loading,setLoading}=useContext(AdminContext)
    const [month, setMonth] = useState(1)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [updateSwitch, setUpdateSwitch] = useState(false)
    const [id, setId] = useState(null)
    const [member, setMember] = useState(null)
    const [email, setEmail] = useState("")

    let getMember = async () => {
        try {
          let { data } = await axios.get("/member/viewMember")
          console.log(data)
          setMember(data.members)
    
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message)
        }
      }

    let submitHandler = async (e) => {
        try {
            e.preventDefault()
            let member = { name, phone,email, month }
            let { data } = await axios.post("/member/addMember", member)
            setName("")
            setPhone("")
            setMonth(1)
            setEmail("")
            getMember()
            setLoading(false)
            console.log(data)
            toast.success(data.message)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    // UpdateHandler for Member Update
    let UpdateHandler=async(e)=>{
        try {
            e.preventDefault()
            let member={name,phone,email,month}

            let updateMember=await axios.put(`/member/updateMember/${id}`,member)
            setName("")
            setPhone("")
            setMonth("")
            setEmail("")
            setUpdateSwitch(false)
            setId(null)
            setLoading(false)
            toast.success(updateMember.data.message)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    return (
        <MemberContext.Provider value={{ month, setMonth, name, setName, phone, setPhone, submitHandler,updateSwitch, setUpdateSwitch,UpdateHandler,id, setId ,getMember,member, setMember ,email, setEmail}}>
            {props.children}
        </MemberContext.Provider>

    )
}