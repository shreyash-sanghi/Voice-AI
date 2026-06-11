import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCopy, FiCheck } from 'react-icons/fi'
import { HiOutlineCodeBracket, HiOutlineCog, HiOutlinePaintBrush, HiOutlineQuestionMarkCircle } from 'react-icons/hi2'

const SECTIONS = [
  { id: 'quickstart', label: 'Quick Start', icon: <HiOutlineCodeBracket size={16}/> },
  { id: 'embed', label: 'Embed Code', icon: <HiOutlineCodeBracket size={16}/> },
  { id: 'config', label: 'Configuration', icon: <HiOutlineCog size={16}/> },
  { id: 'themes', label: 'Themes', icon: <HiOutlinePaintBrush size={16}/> },
  { id: 'faq', label: 'Troubleshooting', icon: <HiOutlineQuestionMarkCircle size={16}/> },
]

function CodeBlock({ code, lang = 'html' }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="relative mt-4 rounded-2xl overflow-hidden" style={{ background: '#060A14', border: '1px solid rgba(99,102,241,0.2)' }}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid rgba(99,102,241,0.12)' }}>
        <span className="text-xs font-mono" style={{ color: 'rgba(226,232,240,0.35)' }}>{lang}</span>
        <button onClick={copy} className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: copied ? '#34D399' : 'rgba(226,232,240,0.4)' }}>
          {copied ? <FiCheck size={12}/> : <FiCopy size={12}/>}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed" style={{ color: '#34D399' }}>{code}</pre>
    </div>
  )
}

function Section({ id, title, children }) {
  return (
    <div id={id} className="mb-14">
      <h2 className="text-xl font-bold text-white mb-5">{title}</h2>
      {children}
    </div>
  )
}

function Prop({ name, type, required, defaultVal, desc }) {
  return (
    <div className="rounded-2xl p-4 mb-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(99,102,241,0.1)' }}>
      <div className="flex items-center gap-3 flex-wrap mb-2">
        <code className="text-sm font-mono" style={{ color: '#A5B4FC' }}>{name}</code>
        <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: 'rgba(6,182,212,0.1)', color: '#06B6D4' }}>{type}</span>
        {required && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(249,115,22,0.1)', color: '#F97316' }}>required</span>}
        {defaultVal && <span className="text-xs" style={{ color: 'rgba(226,232,240,0.35)' }}>default: <code className="font-mono">{defaultVal}</code></span>}
      </div>
      <p className="text-sm" style={{ color: 'rgba(226,232,240,0.55)' }}>{desc}</p>
    </div>
  )
}

export default function Docs() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('quickstart')

  const scrollTo = (id) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen font-sans" style={{ background: '#0A0F1E', color: '#E2E8F0' }}>
      {/* Glow */}
      <div className="fixed pointer-events-none" style={{ top: '-50px', left: '30%', width: '500px', height: '400px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.08), transparent 70%)' }}/>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex gap-10">

        {/* Sidebar */}
        <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-24 self-start">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(226,232,240,0.35)' }}>Documentation</p>
          <nav className="space-y-1">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-left transition-all"
                style={{
                  background: activeSection === s.id ? 'rgba(99,102,241,0.12)' : 'transparent',
                  color: activeSection === s.id ? '#A5B4FC' : 'rgba(226,232,240,0.5)',
                  borderLeft: `2px solid ${activeSection === s.id ? '#6366F1' : 'transparent'}`,
                }}>
                <span style={{ color: activeSection === s.id ? '#6366F1' : 'rgba(226,232,240,0.35)' }}>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl p-4" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <p className="text-xs font-semibold text-white mb-1">Ready to build?</p>
            <p className="text-xs mb-3" style={{ color: 'rgba(226,232,240,0.5)' }}>Set up your assistant now.</p>
            <button onClick={() => navigate("/builder")}
              className="w-full py-2 rounded-xl text-xs font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}>
              Open Builder
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#A5B4FC' }}>
              v1.0
            </span>
            <h1 className="text-4xl font-black text-white tracking-tight" style={{ letterSpacing: '-0.03em' }}>Documentation</h1>
            <p className="mt-3 text-base" style={{ color: 'rgba(226,232,240,0.5)' }}>
              Everything you need to integrate and customize VoiceAI on your website.
            </p>
          </div>

          <Section id="quickstart" title="Quick Start">
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(226,232,240,0.6)' }}>
              Getting VoiceAI on your website takes one script tag and about 5 minutes. Here's the fastest path:
            </p>
            <ol className="space-y-3 mb-4">
              {['Sign in with Google at voiceai.app', 'Go to Builder and fill in your business info', 'Paste your Gemini API key', 'Copy your embed code', 'Paste it before </body> on your site'].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(226,232,240,0.65)' }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(99,102,241,0.2)', color: '#A5B4FC' }}>{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <CodeBlock lang="html" code={`<!-- Minimal embed —just this one tag -->
<script
  src="https://yourapp.com/assistant.js"
  data-user-id="YOUR_USER_ID">
</script>`}/>
          </Section>

          <Section id="embed" title="Embed Code">
            <p className="text-sm leading-relaxed mb-2" style={{ color: 'rgba(226,232,240,0.6)' }}>
              The embed script is a self-contained widget loader. It injects the floating button and popup into your page with no external CSS conflicts.
            </p>
            <p className="text-sm mb-4" style={{ color: 'rgba(226,232,240,0.6)' }}>
              Paste it anywhere in your HTML — ideally just before the closing <code style={{ color: '#A5B4FC' }}>&lt;/body&gt;</code> tag.
            </p>
            <CodeBlock lang="html" code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My Website</title>
</head>
<body>

  <!-- Your website content here -->

  <!-- VoiceAI Assistant — paste before closing body -->
  <script
    src="https://yourapp.com/assistant.js"
    data-user-id="YOUR_USER_ID">
  </script>

</body>
</html>`}/>
            <div className="mt-5 rounded-2xl p-4 text-sm" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)' }}>
              <p className="font-semibold mb-1" style={{ color: '#FCD34D' }}>Note</p>
              <p style={{ color: 'rgba(253,230,138,0.7)', lineHeight: '1.6' }}>
                The <code style={{ color: '#FCD34D' }}>data-user-id</code> attribute is unique to your account. Find it pre-filled in your Builder dashboard under "Embed Code".
              </p>
            </div>
          </Section>

          <Section id="config" title="Configuration">
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(226,232,240,0.6)' }}>
              All configuration is managed through your Builder dashboard — not through script attributes. Here's what each field does:
            </p>
            <Prop name="assistantName" type="string" required desc="The display name shown in the assistant popup header. e.g. 'Aria' or 'Support Bot'." />
            <Prop name="businessName" type="string" required desc="Your company name. Used in the welcome subtitle and AI context." />
            <Prop name="businessType" type="string" required desc="Category of your business (e.g. E-commerce, SaaS, Healthcare). Improves response relevance." />
            <Prop name="businessDescription" type="string" required desc="A description of what you do. This is injected into every AI prompt as context." />
            <Prop name="geminiApiKey" type="string" required desc="Your Google Gemini API key. Get one free at aistudio.google.com/app/apikey." />
            <Prop name="pages" type="array" defaultVal="[]" desc="Array of navigation targets. Each entry has name, path, and keywords. Lets the assistant redirect users." />
            <Prop name="theme" type="string" defaultVal='"dark"' desc="Visual theme. One of: dark, light, glass, neon." />
            <Prop name="tone" type="string" defaultVal='"friendly"' desc="Conversation tone. One of: friendly, professional, sales." />
          </Section>

          <Section id="themes" title="Themes">
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(226,232,240,0.6)' }}>
              Four built-in themes, each tuned for a different brand personality.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'dark', bg: '#050816', accent: '#6366F1', desc: 'Deep space. Default and most popular. Great for tech products.' },
                { name: 'light', bg: '#EFF6FF', accent: '#3B82F6', desc: 'Clean blue-white. Best for professional services and SaaS.' },
                { name: 'glass', bg: 'rgba(15,15,30,0.8)', accent: '#A5F3FC', desc: 'Frosted blur. Unique floating feel. Ideal for creative studios.' },
                { name: 'neon', bg: '#03120d', accent: '#10B981', desc: 'Matrix green. High energy. Great for gaming and developer tools.' },
              ].map(t => (
                <div key={t.name} className="rounded-2xl p-5 flex items-start gap-4"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(99,102,241,0.12)' }}>
                  <div className="w-10 h-10 rounded-xl flex-shrink-0" style={{ background: t.bg, border: `2px solid ${t.accent}`, boxShadow: `0 0 12px ${t.accent}40` }}/>
                  <div>
                    <p className="font-semibold text-white text-sm capitalize">{t.name}</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: 'rgba(226,232,240,0.5)' }}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="faq" title="Troubleshooting">
            <div className="space-y-4">
              {[
                { q: 'The assistant doesn\'t appear on my site', a: 'Check that the script tag is placed inside <body> and that the data-user-id attribute is present and correct. Open the browser console for errors.' },
                { q: 'Voice isn\'t working', a: 'The Web Speech API requires a secure context (HTTPS). Also make sure the browser has microphone permission. Chrome works best.' },
                { q: 'AI responses are slow or failing', a: 'Verify your Gemini API key is valid and hasn\'t hit quota limits. Check the Gemini Status indicator in your Builder dashboard.' },
                { q: 'The assistant\'s language or accent is wrong', a: 'The assistant uses the browser\'s default speech synthesis. To change the voice, contact us — custom voice support is on our roadmap.' },
                { q: 'How do I update the assistant without touching my site code?', a: 'You don\'t have to. All configuration is pulled dynamically from our servers on each load. Just update in the Builder and save.' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(99,102,241,0.1)' }}>
                  <p className="font-semibold text-white text-sm mb-2">{item.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,240,0.55)' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </Section>
        </main>
      </div>
    </div>
  )
}