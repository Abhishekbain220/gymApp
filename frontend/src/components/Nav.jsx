import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AdminContext } from '../utils/AdminContext'
import { Menu, X } from 'lucide-react'  // Make sure lucide-react is installed

const Nav = () => {
  let { logout, token,isOpen,setIsOpen } = useContext(AdminContext)


  return (
    <div className="bg-white  w-screen text-black p-4 shadow-md fixed top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">MyApp</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-lg">
          
          {token ? (
            <button onClick={logout} className="hover:text-red-500 transition">Logout</button>
          )  : null}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 text-lg text-center">
          
          
          {token ? (
             <button 
             onClick={logout} 
             className="ml-auto hover:text-red-500 transition"
           >
             Logout
           </button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Nav
