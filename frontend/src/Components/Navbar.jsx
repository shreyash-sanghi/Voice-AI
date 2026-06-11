import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from "../assets/logo.png"
import { FiLogOut, FiMenu, FiX, FiChevronDown } from "react-icons/fi"
import { HiOutlineSparkles } from "react-icons/hi"
import axios from 'axios'
import { ServerUrl } from '../App'
import toast from 'react-hot-toast'

function Navbar({ user, setUser }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
      setUser(null)
      toast.success("Logged out")
      navigate("/login")
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Features", path: "/features" },
    { label: "How it Works", path: "/how-it-works" },
    { label: "Docs", path: "/docs" },
    { label: "Contact Us", path: "/contact" },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50" style={{ background: 'rgba(10,15,30,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(99,102,241,0.15)' }}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <div onClick={() => navigate("/")} className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}>
            <img src={logo} alt="logo" className="w-6 h-6 object-contain" />
          </div>
          <span className="font-bold text-lg text-white leading-none hidden sm:block">
            Voice<span style={{ color: '#6366F1' }}>AI</span>
          </span>
        </div>

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                color: isActive(link.path) ? '#A5B4FC' : 'rgba(226,232,240,0.7)',
                background: isActive(link.path) ? 'rgba(99,102,241,0.12)' : 'transparent',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Desktop actions */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => navigate("/builder")}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}
                >
                  Builder
                </button>
                <button
                  onClick={() => navigate("/billing")}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{ color: 'rgba(226,232,240,0.75)', border: '1px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.08)' }}
                >
                  Billing
                </button>

                {/* User avatar */}
                <div className="flex items-center gap-2 pl-3 ml-1" style={{ borderLeft: '1px solid rgba(99,102,241,0.2)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, #6366F1, #F97316)' }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="max-w-[110px] hidden lg:block">
                    <p className="text-sm font-medium text-white truncate leading-none">{user.name}</p>
                    <p className="text-xs truncate mt-0.5" style={{ color: 'rgba(226,232,240,0.45)' }}>{user.email}</p>
                  </div>
                  <button onClick={handleLogout} className="ml-1 transition-colors" style={{ color: 'rgba(226,232,240,0.4)' }}>
                    <FiLogOut size={16}/>
                  </button>
                </div>
              </div>

              {/* Mobile hamburger */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white/70">
                {menuOpen ? <FiX size={22}/> : <FiMenu size={22}/>}
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}
            >
              Get Started
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="rounded-2xl p-4 space-y-1" style={{ background: '#111827', border: '1px solid rgba(99,102,241,0.2)' }}>
            {navLinks.map(link => (
              <button key={link.path} onClick={() => { navigate(link.path); setMenuOpen(false) }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all"
                style={{ color: 'rgba(226,232,240,0.75)', background: isActive(link.path) ? 'rgba(99,102,241,0.12)' : 'transparent' }}>
                {link.label}
              </button>
            ))}
            <div className="pt-2 mt-2" style={{ borderTop: '1px solid rgba(99,102,241,0.15)' }}>
              {user && (
                <>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, #6366F1, #F97316)' }}>
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs" style={{ color: 'rgba(226,232,240,0.45)' }}>{user.email}</p>
                    </div>
                  </div>
                  <button onClick={() => { navigate("/builder"); setMenuOpen(false) }}
                    className="w-full py-3 rounded-xl text-white text-sm font-semibold mt-1"
                    style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}>
                    Builder
                  </button>
                  <button onClick={() => { navigate("/billing"); setMenuOpen(false) }}
                    className="w-full py-3 rounded-xl text-sm font-medium mt-2"
                    style={{ color: 'rgba(226,232,240,0.7)', border: '1px solid rgba(99,102,241,0.2)', background: 'transparent' }}>
                    Billing
                  </button>
                  <button onClick={() => { setMenuOpen(false); handleLogout() }}
                    className="w-full py-3 rounded-xl text-sm font-medium mt-2 flex items-center justify-center gap-2"
                    style={{ color: '#F87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
                    <FiLogOut size={15}/> Log Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar