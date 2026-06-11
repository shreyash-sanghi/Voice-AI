import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import { HiOutlineMicrophone, HiOutlineSparkles } from "react-icons/hi"
import { HiOutlineBolt, HiOutlineCodeBracket } from "react-icons/hi2"
import { FcGoogle } from "react-icons/fc"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import axios from "axios"
import { ServerUrl } from '../App'
import { useNavigate as useNav } from 'react-router-dom'
import toast from 'react-hot-toast'

const FEATURES = [
  { icon: <HiOutlineMicrophone size={22}/>, title: "Voice AI", desc: "Real-time voice conversations with your visitors.", color: '#6366F1' },
  { icon: <HiOutlineSparkles size={22}/>, title: "Smart Navigation", desc: "Guide users anywhere on your site by voice.", color: '#06B6D4' },
  { icon: <HiOutlineCodeBracket size={22}/>, title: "One-line Embed", desc: "One <script> tag and you're live.", color: '#F97316' },
  { icon: <HiOutlineBolt size={22}/>, title: "Gemini Powered", desc: "Fast, accurate responses from Google Gemini.", color: '#A855F7' },
]

function Login({ setUser }) {
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const { displayName, email } = result.user
      const res = await axios.post(ServerUrl + "/api/auth/google", { name: displayName, email }, { withCredentials: true })
      setUser(res.data)
      toast.success("Welcome!")
      navigate("/")
    } catch (error) {
      toast.error("Login failed")
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen overflow-hidden" style={{ background: '#0A0F1E', color: '#E2E8F0' }}>
      {/* Glow orbs */}
      <div className="fixed pointer-events-none" style={{ top: '-100px', left: '20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)' }}/>
      <div className="fixed pointer-events-none" style={{ bottom: '-100px', right: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)' }}/>

      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            {/* Logo mark */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}>
                <img src={logo} alt="logo" className="w-7 h-7 object-contain"/>
              </div>
              <span className="font-bold text-lg text-white">Voice<span style={{ color: '#6366F1' }}>AI</span></span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#A5B4FC' }}>
              <HiOutlineSparkles size={13}/>
              AI Voice Assistant Platform
            </div>

            <h1 className="mt-6 font-black tracking-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: '1.08', letterSpacing: '-0.04em' }}>
              Build AI assistants
              <span className="block" style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                for any website.
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed max-w-md" style={{ color: 'rgba(226,232,240,0.6)' }}>
              Create customizable voice assistants that talk, guide users, and integrate anywhere — in minutes.
            </p>

            <button
              onClick={handleLogin}
              className="mt-10 h-14 px-8 rounded-2xl text-white font-semibold flex items-center gap-3 transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', boxShadow: '0 0 50px rgba(99,102,241,0.35)', fontSize: '16px' }}
            >
              <FcGoogle className="text-2xl rounded-full bg-white p-0.5"/>
              Continue with Google
            </button>

            <p className="mt-4 text-sm" style={{ color: 'rgba(226,232,240,0.35)' }}>
              Free plan · 200 AI responses · No card needed
            </p>
          </div>

          {/* Right — Features card */}
          <div className="relative">
            <div className="absolute inset-0 rounded-[40px]" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.08))', filter: 'blur(60px)' }}/>
            <div className="relative rounded-[32px] p-8 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.2)', backdropFilter: 'blur(20px)' }}>

              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#6366F1' }}>What you get</p>
                  <h2 className="text-2xl font-bold text-white">Features</h2>
                </div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}>
                  <img src={logo} alt="logo" className="w-7 h-7 object-contain"/>
                </div>
              </div>

              <div className="space-y-4">
                {FEATURES.map(({ icon, title, desc, color }, i) => (
                  <div key={i} className="flex gap-4 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                      style={{ background: `${color}20`, border: `1px solid ${color}30`, color }}>
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed" style={{ color: 'rgba(226,232,240,0.5)' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login