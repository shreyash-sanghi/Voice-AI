import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineMicrophone, HiOutlineSparkles, HiOutlineCog, HiOutlinePuzzle } from 'react-icons/hi'
import { HiOutlineCodeBracket, HiOutlineBolt, HiOutlineGlobeAlt, HiOutlineShieldCheck, HiArrowRight } from 'react-icons/hi2'

const FEATURES = [
  {
    icon: <HiOutlineMicrophone size={24}/>,
    title: "Real-Time Voice AI",
    desc: "Visitors speak naturally — the assistant understands, responds, and engages in flowing conversation without any typing required.",
    color: '#6366F1',
    badge: "Core",
  },
  {
    icon: <HiOutlineGlobeAlt size={24}/>,
    title: "Smart Navigation",
    desc: "Train your assistant on your site's pages. It intelligently redirects visitors to the right page based on their intent.",
    color: '#06B6D4',
    badge: "Navigation",
  },
  {
    icon: <HiOutlineCodeBracket size={24}/>,
    title: "One-line Embed",
    desc: "Add your assistant to any website with a single <script> tag. No frameworks, no build step, no fuss.",
    color: '#F97316',
    badge: "Integration",
  },
  {
    icon: <HiOutlineBolt size={24}/>,
    title: "Gemini AI Backend",
    desc: "Powered by Google Gemini — fast, accurate, and contextually aware responses every time.",
    color: '#A855F7',
    badge: "AI Engine",
  },
  {
    icon: <HiOutlineCog size={24}/>,
    title: "Full Customization",
    desc: "Choose from 4 beautiful themes — Dark, Light, Glass, Neon — and set the perfect tone: friendly, professional, or sales.",
    color: '#EC4899',
    badge: "Design",
  },
  {
    icon: <HiOutlineShieldCheck size={24}/>,
    title: "Secure by Default",
    desc: "API keys are encrypted at rest. All communication is over HTTPS. Your data is yours, period.",
    color: '#34D399',
    badge: "Security",
  },
  {
    icon: <HiOutlineSparkles size={24}/>,
    title: "Business Context",
    desc: "Give the assistant your business description once. It stays in context for every conversation, answering with domain knowledge.",
    color: '#FBBF24',
    badge: "Context",
  },
  {
    icon: <HiOutlinePuzzle size={24}/>,
    title: "Any Website",
    desc: "Works on plain HTML, React, Next.js, WordPress, Webflow, Shopify — if it renders HTML, VoiceAI works on it.",
    color: '#60A5FA',
    badge: "Compatibility",
  },
]

const COMPARISON = [
  { feature: "Voice-first interaction", us: true, others: false },
  { feature: "Gemini AI responses", us: true, others: false },
  { feature: "One-line embed", us: true, others: false },
  { feature: "Custom themes", us: true, others: true },
  { feature: "Navigation guidance", us: true, others: false },
  { feature: "Free tier available", us: true, others: true },
  { feature: "No extra SDK needed", us: true, others: false },
]

export default function Features() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen font-sans" style={{ background: '#0A0F1E', color: '#E2E8F0' }}>
      {/* Glow */}
      <div className="fixed pointer-events-none" style={{ top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.12), transparent 70%)' }}/>

      {/* Hero */}
      <section className="relative px-4 sm:px-6 pt-20 pb-16 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#A5B4FC' }}>
          Everything you need
        </span>
        <h1 className="mt-6 font-black tracking-tight"
          style={{ fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: '1.1', letterSpacing: '-0.04em' }}>
          Built for results,
          <br/>
          <span style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            not complexity.
          </span>
        </h1>
        <p className="max-w-xl mx-auto mt-5 text-base leading-relaxed" style={{ color: 'rgba(226,232,240,0.55)' }}>
          Every feature is designed to make adding a voice AI assistant as easy as dropping in a script tag.
        </p>
      </section>

      {/* Feature grid */}
      <section className="px-4 sm:px-6 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <div key={i} className="rounded-[24px] p-6 transition-all hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}25`, color: f.color }}>
                  {f.icon}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${f.color}15`, color: f.color }}>
                  {f.badge}
                </span>
              </div>
              <h3 className="font-semibold text-white text-sm">{f.title}</h3>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: 'rgba(226,232,240,0.5)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="px-4 sm:px-6 py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#6366F1' }}>Why VoiceAI</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How we compare</h2>
          </div>

          <div className="rounded-[24px] overflow-hidden" style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
            <div className="grid grid-cols-3 px-6 py-4" style={{ background: 'rgba(99,102,241,0.1)', borderBottom: '1px solid rgba(99,102,241,0.2)' }}>
              <p className="text-sm font-semibold" style={{ color: 'rgba(226,232,240,0.5)' }}>Feature</p>
              <p className="text-sm font-semibold text-center" style={{ color: '#A5B4FC' }}>VoiceAI</p>
              <p className="text-sm font-semibold text-center" style={{ color: 'rgba(226,232,240,0.4)' }}>Others</p>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} className="grid grid-cols-3 px-6 py-4"
                style={{ borderBottom: i < COMPARISON.length - 1 ? '1px solid rgba(255,255,255,0.04)' : undefined, background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                <p className="text-sm" style={{ color: 'rgba(226,232,240,0.65)' }}>{row.feature}</p>
                <p className="text-center">{row.us ? <span style={{ color: '#34D399' }}>✓</span> : <span style={{ color: '#F87171' }}>✗</span>}</p>
                <p className="text-center">{row.others ? <span style={{ color: '#34D399' }}>✓</span> : <span style={{ color: '#F87171' }}>✗</span>}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-2xl mx-auto text-center rounded-[32px] px-8 py-14 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.1))', border: '1px solid rgba(99,102,241,0.25)' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Try it for free today</h2>
          <p className="mt-3 text-sm" style={{ color: 'rgba(226,232,240,0.5)' }}>No credit card · 200 free responses · 5 min setup</p>
          <button onClick={() => navigate("/builder")}
            className="mt-8 px-8 py-4 rounded-2xl font-semibold text-white flex items-center gap-2 mx-auto transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', boxShadow: '0 0 40px rgba(99,102,241,0.3)' }}>
            Build Your Assistant <HiArrowRight size={18}/>
          </button>
        </div>
      </section>
    </div>
  )
}