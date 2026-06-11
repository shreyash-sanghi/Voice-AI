import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const INFO = [
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: 'Phone',
    value: '+91 98765 43210',
    sub: 'Mon – Sat, 10 AM – 7 PM IST',
    href: 'tel:+919876543210',
    color: '#34D399',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: 'support@voiceai.in',
    sub: 'We reply within 24 hours',
    href: 'mailto:support@voiceai.in',
    color: '#6366F1',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Address',
    value: '4th Floor, Cyber Hub Tower B',
    sub: 'Sector 25, Gurugram, Haryana 122002',
    href: 'https://maps.google.com/?q=Cyber+Hub+Gurugram',
    color: '#F97316',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Business Hours',
    value: 'Mon – Saturday',
    sub: '10:00 AM – 7:00 PM IST',
    href: null,
    color: '#A855F7',
  },
]

const SOCIALS = [
  {
    label: 'Twitter / X',
    handle: '@voiceai_in',
    href: 'https://twitter.com/voiceai_in',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    handle: 'VoiceAI India',
    href: 'https://linkedin.com/company/voiceai-in',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    handle: 'voiceai-in',
    href: 'https://github.com/voiceai-in',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
]

const TOPICS = [
  'General enquiry',
  'Technical support',
  'Billing & payments',
  'Partnership / reseller',
  'Feature request',
  'Report a bug',
]

export default function Contact() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [focused, setFocused] = useState(null)

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    // Simulate API call
    setTimeout(() => setStatus('sent'), 1800)
  }

  const inputBase = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(99,102,241,0.18)',
    borderRadius: '14px',
    padding: '13px 16px',
    color: '#E2E8F0',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
  }

  const focusStyle = (name) => focused === name
    ? { borderColor: '#6366F1', boxShadow: '0 0 0 3px rgba(99,102,241,0.12)' }
    : {}

  return (
    <div className="min-h-screen font-sans" style={{ background: '#0A0F1E', color: '#E2E8F0' }}>

      {/* Ambient glows */}
      <div className="fixed pointer-events-none" style={{ top: '-120px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.13), transparent 65%)' }} />
      <div className="fixed pointer-events-none" style={{ bottom: '0', left: '0', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(6,182,212,0.07), transparent 70%)' }} />
      <div className="fixed pointer-events-none" style={{ bottom: '0', right: '0', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(249,115,22,0.06), transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">

        {/* Page header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#A5B4FC' }}>
            We're based in India 🇮🇳
          </span>
          <h1 className="mt-5 font-black tracking-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 58px)', lineHeight: '1.1', letterSpacing: '-0.04em' }}>
            Get in touch
          </h1>
          <p className="mt-4 max-w-md mx-auto text-base leading-relaxed"
            style={{ color: 'rgba(226,232,240,0.5)' }}>
            Questions, feedback, or just want to say hi — we read every message and reply within one business day.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── LEFT — Contact info panel ─────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Business card feel */}
            <div className="rounded-[28px] overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.18)' }}>

              {/* Card top accent strip */}
              <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #6366F1, #06B6D4, #A855F7)' }} />

              <div className="p-7">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(226,232,240,0.35)' }}>VoiceAI Technologies Pvt. Ltd.</p>
                  <p className="text-xl font-bold text-white">Contact details</p>
                </div>

                {/* Info rows */}
                <div className="space-y-5">
                  {INFO.map((item, i) => (
                    <div key={i}>
                      {i > 0 && <div className="mb-5" style={{ height: '1px', background: 'rgba(99,102,241,0.1)' }} />}
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="flex items-start gap-4 group">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-105"
                            style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}25` }}>
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                              style={{ color: item.color }}>{item.label}</p>
                            <p className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">{item.value}</p>
                            <p className="text-xs mt-0.5" style={{ color: 'rgba(226,232,240,0.4)' }}>{item.sub}</p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}25` }}>
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                              style={{ color: item.color }}>{item.label}</p>
                            <p className="font-semibold text-white text-sm">{item.value}</p>
                            <p className="text-xs mt-0.5" style={{ color: 'rgba(226,232,240,0.4)' }}>{item.sub}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* GST / CIN block */}
            <div className="rounded-[20px] p-5"
              style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(226,232,240,0.35)' }}>Business info</p>
              <div className="space-y-2">
                {[
                  ['GST No.', '06AABCV1234F1Z5'],
                  ['CIN', 'U72200HR2024PTC123456'],
                  ['Founded', '2024 · Gurugram, India'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4">
                    <span className="text-xs" style={{ color: 'rgba(226,232,240,0.4)' }}>{k}</span>
                    <span className="text-xs font-mono" style={{ color: 'rgba(226,232,240,0.65)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="rounded-[20px] p-5"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(226,232,240,0.35)' }}>Find us online</p>
              <div className="space-y-3">
                {SOCIALS.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 group transition-all">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
                      style={{ background: 'rgba(99,102,241,0.12)', color: '#A5B4FC', border: '1px solid rgba(99,102,241,0.2)' }}>
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{s.label}</p>
                      <p className="text-xs" style={{ color: '#6366F1' }}>{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT — Contact form ──────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="rounded-[28px] overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.18)' }}>

              {/* Top accent */}
              <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #6366F1, #06B6D4)' }} />

              <div className="p-7 sm:p-9">

                {status === 'sent' ? (
                  /* ─── Success state ─── */
                  <div className="flex flex-col items-center justify-center py-14 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                      style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)' }}>
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#34D399" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
                    <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'rgba(226,232,240,0.55)' }}>
                      Thanks for reaching out. Our team will get back to you at <span style={{ color: '#A5B4FC' }}>{form.email}</span> within 24 hours.
                    </p>
                    <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', topic: '', message: '' }) }}
                      className="mt-8 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                      style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)' }}>
                      Send another message
                    </button>
                  </div>
                ) : (
                  /* ─── Form ─── */
                  <>
                    <div className="mb-7">
                      <h2 className="text-xl font-bold text-white">Send us a message</h2>
                      <p className="mt-1 text-sm" style={{ color: 'rgba(226,232,240,0.45)' }}>
                        Fill in the details below and we'll be in touch.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                            style={{ color: 'rgba(226,232,240,0.4)' }}>Your name</label>
                          <input
                            type="text"
                            placeholder="Rahul Sharma"
                            value={form.name}
                            onChange={set('name')}
                            onFocus={() => setFocused('name')}
                            onBlur={() => setFocused(null)}
                            required
                            style={{ ...inputBase, ...focusStyle('name') }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                            style={{ color: 'rgba(226,232,240,0.4)' }}>Email address</label>
                          <input
                            type="email"
                            placeholder="rahul@example.com"
                            value={form.email}
                            onChange={set('email')}
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused(null)}
                            required
                            style={{ ...inputBase, ...focusStyle('email') }}
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                          style={{ color: 'rgba(226,232,240,0.4)' }}>Phone (optional)</label>
                        <div className="flex gap-2">
                          <div className="flex items-center px-3 rounded-[14px] text-sm font-medium flex-shrink-0"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(99,102,241,0.18)', color: 'rgba(226,232,240,0.6)' }}>
                            🇮🇳 +91
                          </div>
                          <input
                            type="tel"
                            placeholder="98765 43210"
                            value={form.phone || ''}
                            onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                            onFocus={() => setFocused('phone')}
                            onBlur={() => setFocused(null)}
                            style={{ ...inputBase, ...focusStyle('phone') }}
                          />
                        </div>
                      </div>

                      {/* Topic */}
                      <div>
                        <label className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                          style={{ color: 'rgba(226,232,240,0.4)' }}>Topic</label>
                        <select
                          value={form.topic}
                          onChange={set('topic')}
                          onFocus={() => setFocused('topic')}
                          onBlur={() => setFocused(null)}
                          style={{ ...inputBase, ...focusStyle('topic'), appearance: 'none', cursor: 'pointer' }}>
                          <option value="" disabled style={{ background: '#111827' }}>Select a topic…</option>
                          {TOPICS.map(t => (
                            <option key={t} value={t} style={{ background: '#111827' }}>{t}</option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                          style={{ color: 'rgba(226,232,240,0.4)' }}>Message</label>
                        <textarea
                          rows={5}
                          placeholder="Tell us what's on your mind…"
                          value={form.message}
                          onChange={set('message')}
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                          required
                          style={{ ...inputBase, ...focusStyle('message'), resize: 'none' }}
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full h-14 rounded-2xl font-semibold text-white text-base transition-all hover:scale-[1.015] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        style={{
                          background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
                          boxShadow: status !== 'sending' ? '0 0 32px rgba(99,102,241,0.35)' : undefined,
                        }}>
                        {status === 'sending' ? (
                          <>
                            <span className="w-4 h-4 rounded-full animate-spin inline-block"
                              style={{ border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white' }} />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send message
                            <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                          </>
                        )}
                      </button>

                      <p className="text-xs text-center pt-1" style={{ color: 'rgba(226,232,240,0.28)' }}>
                        We respect your privacy — no spam, ever.
                      </p>

                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Response time badge */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 px-2">
              {[
                { icon: '⚡', text: 'Avg. reply in 4 hours' },
                { icon: '🔒', text: 'Your data is safe' },
                { icon: '🇮🇳', text: 'India-based support' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-xs"
                  style={{ color: 'rgba(226,232,240,0.4)' }}>
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}