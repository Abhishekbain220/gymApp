import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../utils/AdminContext'
import axios from '../utils/axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    let { username, setUsername, email, setEmail, password, setPassword, token, setToken,loading,setLoading } = useContext(AdminContext)
    let navigate = useNavigate()

    let submitHandler = async (e) => {
        try {
            e.preventDefault()
            let user = { email, password }
            let loginData = await axios.post("/user/login", user)
            console.log(loginData)
            localStorage.setItem("authToken", JSON.stringify(loginData.data.token));
            await setToken(loginData.data.token)
            setEmail("")
            setPassword("")
            setLoading(false)
            toast.success(loginData.data.message)
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
            setLoading(false)
            
        }
    }

    console.log(token)
    useEffect(() => {
        if (token) navigate("/");
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-800 to-gray-900 p-4">
            <form onSubmit={submitHandler} className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform hover:scale-105 transition-transform duration-300">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Welcome Back 👋</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                </div>

                <div className='flex justify-center'>
        <button onClick={()=>setLoading(true)}
          type="submit"
          className="flex items-center text-center px-4 py-2  bg-gray-800 text-white rounded-lg hover:bg-black disabled:opacity-50"
        >
          {loading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}{loading ? 'Loading...' : 'Login'}
        </button>
        </div>

                <p className="text-center text-gray-500 text-sm mt-4">
                    Don't have an account? <Link to={"/signup"}><span className="text-gray-800 font-medium cursor-pointer hover:underline">Sign Up</span></Link>
                </p>
            </form>
        </div>
    )
}

export default Login
