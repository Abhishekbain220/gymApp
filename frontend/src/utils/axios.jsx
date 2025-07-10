import axios from "axios";

let instance=axios.create({
    baseURL:"https://reminderbackend-i6wr.onrender.com",
    withCredentials:true
})

export default instance