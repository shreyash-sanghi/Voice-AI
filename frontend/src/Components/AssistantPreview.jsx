import React, { useState } from 'react'
import { CiMicrophoneOn } from "react-icons/ci"

const themes = {
  dark: {
    bg: '#050816',
    overlay: 'radial-gradient(circle at 40% 20%, rgba(99,102,241,0.22), transparent 55%)',
    orb: 'linear-gradient(135deg, #4cc9ff, #6366F1, #ec4899)',
    border: 'rgba(255,255,255,0.08)',
    text: '#fff',
    sub: 'rgba(255,255,255,0.6)',
    listening: '#34D399',
    wave: '#34D399',
    btn: 'linear-gradient(135deg, #6366F1, #4f8cff)',
    glow: '0 0 50px rgba(99,102,241,0.4)',
    dot: '#6366F1',
    dotBorder: '#A5B4FC',
  },
  light: {
    bg: 'linear-gradient(135deg, #fff 0%, #EFF6FF 100%)',
    overlay: 'radial-gradient(circle at 40% 20%, rgba(59,130,246,0.1), transparent 55%)',
    orb: 'linear-gradient(135deg, #7dd3fc, #67e8f9, #c4b5fd)',
    border: '#DBEAFE',
    text: '#0F172A',
    sub: '#64748B',
    listening: '#3B82F6',
    wave: '#60A5FA',
    btn: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
    glow: '0 0 50px rgba(59,130,246,0.3)',
    dot: '#fff',
    dotBorder: '#3B82F6',
  },
  glass: {
    bg: 'rgba(15,15,30,0.7)',
    overlay: 'radial-gradient(circle at 40% 20%, rgba(255,255,255,0.06), transparent 55%)',
    orb: 'linear-gradient(135deg, #bae6fd, #c4b5fd, #f5d0fe)',
    border: 'rgba(255,255,255,0.1)',
    text: '#fff',
    sub: 'rgba(255,255,255,0.65)',
    listening: '#A5F3FC',
    wave: '#A5F3FC',
    btn: 'linear-gradient(135deg, rgba(56,189,248,0.7), rgba(139,92,246,0.7))',
    glow: '0 0 60px rgba(34,211,238,0.3)',
    dot: 'rgba(255,255,255,0.5)',
    dotBorder: '#fff',
  },
  neon: {
    bg: '#03120d',
    overlay: 'radial-gradient(circle at 40% 20%, rgba(16,185,129,0.2), transparent 55%)',
    orb: 'linear-gradient(135deg, #34d399, #10b981, #14b8a6)',
    border: 'rgba(16,185,129,0.2)',
    text: '#ECFDF5',
    sub: 'rgba(209,250,229,0.65)',
    listening: '#6EE7B7',
    wave: '#6EE7B7',
    btn: 'linear-gradient(135deg, #10B981, #22C55E)',
    glow: '0 0 55px rgba(16,185,129,0.4)',
    dot: '#10B981',
    dotBorder: '#34D399',
  },
}

function AssistantPreview() {
  const [theme, setTheme] = useState("dark")
  const c = themes[theme]

  const swatches = [
    { key: "dark", color: '#050816', border: '#6366F1' },
    { key: "light", color: '#EFF6FF', border: '#3B82F6' },
    { key: "glass", color: 'rgba(255,255,255,0.15)', border: '#fff', blur: true },
    { key: "neon", color: '#10B981', border: '#34D399' },
  ]

  return (
    <div className="flex items-center justify-center px-3 py-10 sm:py-14">
      <div
        className="relative w-[280px] h-[460px] sm:w-[330px] sm:h-[510px] rounded-[36px] sm:rounded-[44px] overflow-hidden transition-all duration-500"
        style={{
          background: c.bg,
          border: `1px solid ${c.border}`,
          boxShadow: '0 30px 90px rgba(0,0,0,0.4)',
          backdropFilter: theme === 'glass' ? 'blur(30px)' : undefined,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: c.overlay }}/>

        {/* Theme switcher */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          {swatches.map(s => (
            <button
              key={s.key}
              onClick={() => setTheme(s.key)}
              className="transition-all"
              style={{
                width: theme === s.key ? '20px' : '16px',
                height: theme === s.key ? '20px' : '16px',
                borderRadius: '999px',
                background: s.color,
                border: `2px solid ${theme === s.key ? s.border : 'rgba(255,255,255,0.2)'}`,
                backdropFilter: s.blur ? 'blur(8px)' : undefined,
                boxShadow: theme === s.key ? `0 0 10px ${s.border}` : undefined,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-between h-full px-6 py-7">

          {/* Orb */}
          <div className="relative mt-2">
            <div className="absolute inset-0 rounded-full opacity-50" style={{ background: c.orb, filter: 'blur(60px)', transform: 'scale(2.2)' }}/>
            <div
              className="relative rounded-full"
              style={{
                width: '108px', height: '108px',
                background: c.orb,
                animation: 'orbPulse 3s ease-in-out infinite',
                boxShadow: c.glow,
              }}
            />
          </div>

          {/* Text */}
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: c.text }}>
              AI Website Assistant
            </h2>
            <p className="mt-3 text-sm leading-relaxed max-w-[220px] mx-auto" style={{ color: c.sub }}>
              Your smart voice guide.<br/>Ask anything about this site.
            </p>

            <div className="mt-6">
              <p className="text-sm font-semibold" style={{ color: c.listening }}>Listening…</p>
              <div className="flex items-end justify-center gap-1 mt-3" style={{ height: '32px' }}>
                {[12, 24, 16, 28, 20, 14].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full"
                    style={{
                      height: `${h}px`,
                      background: c.wave,
                      animation: `waveBar 1.3s ease-in-out ${i * 0.15}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mic button */}
          <div className="relative mb-1">
            <div className="absolute inset-0 rounded-full opacity-60" style={{ background: c.wave, filter: 'blur(20px)', transform: 'scale(1.5)' }}/>
            <button
              className="relative flex items-center justify-center rounded-full transition-transform hover:scale-105"
              style={{
                width: '64px', height: '64px',
                background: c.btn,
                boxShadow: c.glow,
              }}
            >
              <CiMicrophoneOn size={26} style={{ color: 'rgba(0,0,0,0.75)' }}/>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes waveBar {
          0%, 100% { opacity: 0.4; transform: scaleY(0.7); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  )
}

export default AssistantPreview