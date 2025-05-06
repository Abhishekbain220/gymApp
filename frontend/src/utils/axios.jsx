import axios from "axios";

let instance=axios.create({
    baseURL:"https://gymapp-wcgp.onrender.com",
    withCredentials:true
})

export default instance