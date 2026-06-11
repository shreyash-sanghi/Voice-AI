import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi2'
import { HiOutlineCheck } from 'react-icons/hi'

const STEPS = [
  {
    n: "01",
    title: "Create your account",
    desc: "Sign in with Google — takes under 10 seconds. No password, no form, no friction.",
    color: '#6366F1',
    details: [
      "Click 'Get Started' and choose your Google account",
      "We create your workspace instantly",
      "You land directly in the Builder",
    ],
    code: null,
  },
  {
    n: "02",
    title: "Configure your assistant",
    desc: "Tell it who you are. A few fields and your AI assistant has all the context it needs.",
    color: '#06B6D4',
    details: [
      "Enter your business name and description",
      "Pick a theme: Dark, Light, Glass, or Neon",
      "Choose a tone: Friendly, Professional, or Sales",
    ],
    code: null,
  },
  {
    n: "03",
    title: "Add your Gemini API key",
    desc: "Get a free key from Google AI Studio in 30 seconds. Paste it in — that's your AI engine.",
    color: '#A855F7',
    details: [
      "Visit aistudio.google.com/app/apikey",
      "Create a free key — no billing required",
      "Paste it in the API key field and save",
    ],
    code: null,
  },
  {
    n: "04",
    title: "Map your pages",
    desc: "Add the pages on your website so the assistant can guide visitors to the right place.",
    color: '#F97316',
    details: [
      "Add each page name and URL path",
      "Optionally include keywords to improve matching",
      "The assistant learns to redirect users intelligently",
    ],
    code: null,
  },
  {
    n: "05",
    title: "Embed & go live",
    desc: "Copy your unique embed code and paste it before the </body> tag on your website.",
    color: '#34D399',
    details: [
      "Copy the embed script from your Builder dashboard",
      "Paste it before </body> in your HTML",
      "Refresh your site — your assistant is live",
    ],
    code: `<!-- Paste this before </body> -->\n<script\n  src="https://yourapp.com/assistant.js"\n  data-user-id="YOUR_ID">\n</script>`,
  },
]

const FAQS = [
  { q: "Does it work on WordPress or Webflow?", a: "Yes — any website that lets you edit HTML. WordPress, Webflow, Shopify, plain HTML, React, Next.js — all work." },
  { q: "What happens when free messages run out?", a: "The assistant stops responding until you upgrade to Pro (₹699 / 3 months) or the limit resets." },
  { q: "Is my Gemini API key safe?", a: "It's stored encrypted and only used server-side to generate responses. We never expose it in client code." },
  { q: "Can visitors use it on mobile?", a: "Yes. The assistant uses the browser's built-in Web Speech API which is supported on Chrome for desktop and mobile." },
  { q: "Can I change the theme later?", a: "Absolutely. Go back to the Builder at any time, change the theme or any other setting, and hit Update." },
]

export default function HowItWorks() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen font-sans" style={{ background: '#0A0F1E', color: '#E2E8F0' }}>
      {/* Glow */}
      <div className="fixed pointer-events-none" style={{ top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.1), transparent 70%)' }}/>

      {/* Hero */}
      <section className="relative px-4 sm:px-6 pt-20 pb-12 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#A5B4FC' }}>
          Simple by design
        </span>
        <h1 className="mt-6 font-black tracking-tight"
          style={{ fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: '1.1', letterSpacing: '-0.04em' }}>
          From zero to live
          <br/>
          <span style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            in 5 minutes.
          </span>
        </h1>
        <p className="max-w-lg mx-auto mt-5 text-base leading-relaxed" style={{ color: 'rgba(226,232,240,0.55)' }}>
          Five steps. No developer needed. No complex config.
        </p>
      </section>

      {/* Steps */}
      <section className="px-4 sm:px-6 py-12 max-w-4xl mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px hidden sm:block" style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.5), rgba(6,182,212,0.5), transparent)' }}/>

          <div className="space-y-8">
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-6">
                {/* Step number */}
                <div className="flex-shrink-0 hidden sm:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm text-white z-10"
                    style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`, boxShadow: `0 0 20px ${s.color}40` }}>
                    {s.n}
                  </div>
                </div>

                <div className="flex-1 rounded-[24px] p-6 pb-7"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.12)' }}>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full sm:hidden"
                      style={{ background: `${s.color}15`, color: s.color }}>{s.n}</span>
                    <h3 className="font-bold text-white text-lg">{s.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(226,232,240,0.55)' }}>{s.desc}</p>

                  <div className="space-y-2">
                    {s.details.map((d, j) => (
                      <div key={j} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(226,232,240,0.7)' }}>
                        <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${s.color}20`, color: s.color }}>
                          <HiOutlineCheck size={11}/>
                        </span>
                        {d}
                      </div>
                    ))}
                  </div>

                  {s.code && (
                    <pre className="mt-5 rounded-2xl p-4 text-xs font-mono overflow-x-auto"
                      style={{ background: '#060A14', border: '1px solid rgba(99,102,241,0.2)', color: '#34D399' }}>
                      {s.code}
                    </pre>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#6366F1' }}>Questions</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently asked</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(99,102,241,0.15)', background: 'rgba(255,255,255,0.02)' }}>
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-medium text-sm text-white">{faq.q}</span>
                  <span className="text-lg flex-shrink-0 transition-transform" style={{ color: '#6366F1', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'rgba(226,232,240,0.6)', borderTop: '1px solid rgba(99,102,241,0.1)' }}>
                    <p className="pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-16 pb-24">
        <div className="max-w-2xl mx-auto text-center rounded-[32px] px-8 py-14 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.1))', border: '1px solid rgba(99,102,241,0.25)' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Ready to get started?</h2>
          <p className="mt-3 text-sm" style={{ color: 'rgba(226,232,240,0.5)' }}>It's free. It's fast. It works everywhere.</p>
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