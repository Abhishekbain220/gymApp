import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AdminProvider } from './utils/AdminContext.jsx'
import { MemberProvider } from './utils/MemberContext.jsx'
import { ToastContainer, toast } from 'react-toastify'

createRoot(document.getElementById('root')).render(
    <AdminProvider>
        <MemberProvider>
            <BrowserRouter>
                <App />
                <ToastContainer />
            </BrowserRouter>
        </MemberProvider>
    </AdminProvider>
)
