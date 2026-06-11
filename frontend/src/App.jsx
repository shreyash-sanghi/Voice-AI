import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import axios from 'axios'
import ProtectedRoute from './Components/ProtectedRoute'
import Navbar from './Components/Navbar'
import Builder from './pages/Builder'
import Billing from './pages/Billing'
import Features from './pages/Features'
import HowItWorks from './pages/HowItWorks'
import Docs from './pages/DOCS'
import { Toaster } from "react-hot-toast"
import Contact from './pages/ContactUs'

export const ServerUrl = "http://localhost:8000"
export const CLIENT_URL = "http://localhost:5173"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true })
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchMe()
  }, [])

  return (
    <>
      <Toaster position='top-right' toastOptions={{
        style: {
          background: '#1E2235',
          color: '#E2E8F0',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '14px',
          fontSize: '14px',
        },
        success: { iconTheme: { primary: '#6366F1', secondary: '#fff' } },
      }}/>
      <Routes>
        <Route path='/login' element={<Login setUser={setUser}/>} />

        <Route path='/*' element={<ProtectedRoute user={user} loading={loading}>
          <Navbar setUser={setUser} user={user}/>
          <Routes>
            <Route path='/' element={<Home user={user}/>} />
            <Route path='/builder' element={<Builder user={user} setUser={setUser}/>}/>
        <Route path='/contact' element={<Contact setUser={setUser}/>} />
            <Route path='/billing' element={<Billing user={user} setUser={setUser}/>}/>
        <Route path='/features' element={<Features/>} />
        <Route path='/how-it-works' element={<HowItWorks/>} />
        <Route path='/docs' element={<Docs/>} />
            <Route path='*' element={<Navigate to="/" replace/>}/>
          </Routes>
        </ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App