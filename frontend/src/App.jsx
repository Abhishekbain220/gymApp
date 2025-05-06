import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Nav from './components/Nav'
import Login from './components/Login'
import Signup from './components/Signup'

const App = () => {
  return (
    <div className='relative'>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}>Home</Route>
        <Route path='/about' element={<About/>}>About</Route>
        <Route path='/login' element={<Login/>}>Login</Route>
        <Route path='/signup' element={<Signup/>}>Signup</Route>
      </Routes>
      
    </div>
  )
}

export default App