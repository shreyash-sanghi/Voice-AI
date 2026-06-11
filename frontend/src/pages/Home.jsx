import React from 'react'
import { useNavigate } from 'react-router-dom'
import AssistantPreview from '../Components/AssistantPreview'
import logo from "../assets/logo.png"
import { HiOutlineMicrophone, HiOutlineSparkles } from 'react-icons/hi'
import { HiOutlineCodeBracket, HiOutlineBolt, HiArrowRight } from 'react-icons/hi2'

const STEPS = [
  { step: "1", title: "Sign up free", desc: "Continue with Google — no credit card required." },
  { step: "2", title: "Customize", desc: "Set your business name, tone, and visual theme." },
  { step: "3", title: "Train it", desc: "Add your pages and business details once." },
  { step: "4", title: "Embed", desc: "Paste one script tag before </body> and you're live." },
]

const FEATURES = [
  { icon: <HiOutlineMicrophone size={20}/>, label: "Voice AI", color: '#6366F1' },
  { icon: <HiOutlineSparkles size={20}/>, label: "Smart Nav", color: '#06B6D4' },
  { icon: <HiOutlineCodeBracket size={20}/>, label: "One-line embed", color: '#F97316' },
  { icon: <HiOutlineBolt size={20}/>, label: "Gemini Powered", color: '#A855F7' },
]

export default function Home({ user }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen overflow-hidden font-sans" style={{ background: '#0A0F1E', color: '#E2E8F0' }}>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-20 sm:pt-28 pb-20">
        {/* Mesh glows */}
        <div className="absolute pointer-events-none" style={{ top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, transparent 70%)', filter: 'blur(1px)' }}/>
        <div className="absolute pointer-events-none" style={{ bottom: '0', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' }}/>
        <div className="absolute pointer-events-none" style={{ bottom: '0', right: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }}/>

        <div className="relative max-w-6xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold"
              style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#A5B4FC' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#6366F1' }}/>
              Voice AI · Powered by Gemini
            </span>
          </div>

          {/* Headline */}
          <div className="text-center mt-8 sm:mt-10">
            <h1 className="max-w-4xl mx-auto font-black tracking-tight" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: '1.08', letterSpacing: '-0.04em' }}>
              Give your website
              <br/>
              <span style={{ background: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 50%, #A855F7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                a voice.
              </span>
            </h1>
            <p className="max-w-xl mx-auto mt-6 text-base sm:text-lg leading-relaxed" style={{ color: 'rgba(226,232,240,0.6)' }}>
              Drop in one script tag. Your visitors can ask questions, get answers, and navigate your site — all by voice.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
              <button
                onClick={() => navigate("/builder")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-sm sm:text-base text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}
              >
                Build Your Assistant
                <HiArrowRight size={18}/>
              </button>
              <button
                onClick={() => navigate("/how-it-works")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-medium text-sm sm:text-base transition-all hover:scale-[1.02]"
                style={{ border: '1px solid rgba(99,102,241,0.3)', color: 'rgba(226,232,240,0.75)', background: 'rgba(99,102,241,0.06)' }}
              >
                See how it works
              </button>
            </div>
            <p className="mt-4 text-xs sm:text-sm" style={{ color: 'rgba(226,232,240,0.35)' }}>
              Free plan · 200 AI responses · No credit card needed
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ color: f.color }}>{f.icon}</span>
                <span className="text-sm font-medium" style={{ color: 'rgba(226,232,240,0.7)' }}>{f.label}</span>
              </div>
            ))}
          </div>

          {/* Preview */}
          <AssistantPreview />
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 sm:px-6 py-20" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#6366F1' }}>Simple setup</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Live in under 5 minutes</h2>
            <p className="mt-3 text-sm sm:text-base" style={{ color: 'rgba(226,232,240,0.5)' }}>No complicated integration, no developer needed.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div key={i}
                className="group rounded-[24px] p-7 transition-all hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(99,102,241,0.15)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white mb-5"
                  style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}>
                  {s.step}
                </div>
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(226,232,240,0.5)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-3xl mx-auto text-center rounded-[32px] px-8 py-14 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.1))', border: '1px solid rgba(99,102,241,0.25)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.15), transparent 70%)' }}/>
          <h2 className="relative text-2xl sm:text-3xl font-bold text-white">Ready to add AI to your website?</h2>
          <p className="relative mt-3 text-sm sm:text-base" style={{ color: 'rgba(226,232,240,0.55)' }}>Start free, no commitment needed.</p>
          <button
            onClick={() => navigate("/builder")}
            className="relative mt-8 px-8 py-4 rounded-2xl font-semibold text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', boxShadow: '0 0 40px rgba(99,102,241,0.35)' }}>
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#060A14' }} className="px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div onClick={() => navigate("/")} className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}>
              <img src={logo} alt="logo" className="w-5 h-5 object-contain"/>
            </div>
            <span className="font-bold text-base text-white">Voice<span style={{ color: '#6366F1' }}>AI</span></span>
          </div>
          <div className="flex gap-6">
            {[['Features', '/features'], ['How it Works', '/how-it-works'], ['Docs', '/docs']].map(([label, path]) => (
              <button key={path} onClick={() => navigate(path)} className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(226,232,240,0.4)' }}>{label}</button>
            ))}
          </div>
          <p className="text-sm" style={{ color: 'rgba(226,232,240,0.3)' }}>© {new Date().getFullYear()} VoiceAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}