import axios from 'axios'
import React, { useState } from 'react'
import { FiCopy, FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'
import { CLIENT_URL, ServerUrl } from '../App'
import toast from 'react-hot-toast'

const THEMES = ["light", "dark", "glass", "neon"]
const TONES = ["friendly", "professional", "sales"]

const THEME_META = {
  dark: { bg: '#050816', accent: '#6366F1', label: 'Dark' },
  light: { bg: '#EFF6FF', accent: '#3B82F6', label: 'Light' },
  glass: { bg: 'rgba(255,255,255,0.15)', accent: '#A5F3FC', label: 'Glass', blur: true },
  neon: { bg: '#03120d', accent: '#10B981', label: 'Neon' },
}

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(99,102,241,0.2)',
  borderRadius: '14px',
  padding: '12px 16px',
  color: '#E2E8F0',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s',
}

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="rounded-[24px] p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.15)' }}>
      <div className="mb-5">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-sm mt-1" style={{ color: 'rgba(226,232,240,0.45)' }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

function Builder({ user, setUser }) {
  const [editAssistant, setEditAssistant] = useState(!user?.isSetupComplete)
  const [assistantName, setAssistantName] = useState(user?.assistantName || "")
  const [businessName, setBusinessName] = useState(user?.businessName || "")
  const [businessType, setBusinessType] = useState(user?.businessType || "")
  const [businessDescription, setBusinessDescription] = useState(user?.businessDescription || "")
  const [theme, setTheme] = useState(user?.theme || "dark")
  const [tone, setTone] = useState(user?.tone || "friendly")
  const [geminiApiKey, setGeminiApiKey] = useState(user?.geminiApiKey || "")
  const [pages, setPages] = useState(user?.pages || [])
  const [pageName, setPageName] = useState("")
  const [pagePath, setPagePath] = useState("")
  const [pageKeywords, setPageKeywords] = useState("")
  const [loading, setLoading] = useState(false)

  const addPage = () => {
    if (!pageName || !pagePath) return
    setPages([...pages, { name: pageName, path: pagePath, keywords: pageKeywords.split(",").map(k => k.trim()) }])
    setPageName(""); setPagePath(""); setPageKeywords("")
  }

  const removePage = (index) => setPages(pages.filter((_, i) => i !== index))

  const saveAssistant = async () => {
    setLoading(true)
    try {
      const res = await axios.post(ServerUrl + "/api/user/save-assistant", { assistantName, businessName, businessType, businessDescription, tone, theme, geminiApiKey, pages }, { withCredentials: true })
      setUser(res.data.user)
      setEditAssistant(false)
      toast.success("Assistant saved!")
    } catch {
      toast.error("Failed to save assistant")
    }
    setLoading(false)
  }

  const remainingMessages = Math.max(0, (user?.requestLimit || 0) - (user?.totalMessages || 0))
  const remainingDays = user?.proExpiresAt ? Math.max(0, Math.ceil((new Date(user.proExpiresAt) - new Date()) / (1000 * 60 * 60 * 24))) : 0

  const embedCode = `<script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}"></script>`

  const statCards = [
    { label: 'Current Plan', value: user?.plan, cap: true },
    {
      label: 'Gemini Status', value: user?.geminiStatus, cap: true,
      color: user?.geminiStatus === 'active' ? '#34D399' : user?.geminiStatus === 'invalid' ? '#F87171' : '#FBBF24'
    },
    { label: user?.plan === 'free' ? 'Messages Left' : 'Plan Expiry', value: user?.plan === 'free' ? remainingMessages : `${remainingDays} days`, cap: true },
  ]

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: '#0A0F1E' }}>
      {/* Glow */}
      <div className="fixed pointer-events-none" style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.1), transparent 70%)' }}/>

      <div className="relative max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#6366F1' }}>Dashboard</p>
          <h2 className="text-3xl font-bold text-white">Assistant Builder</h2>
          <p className="mt-1 text-sm" style={{ color: 'rgba(226,232,240,0.45)' }}>Customize and manage your AI assistant</p>
        </div>

        {/* Summary card — only when setup is done */}
        {user.isSetupComplete && !editAssistant && (
          <div className="space-y-5">
            <div className="rounded-[24px] p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(226,232,240,0.4)' }}>Your Assistant</p>
                  <h2 className="text-2xl font-bold text-white">{user.assistantName}</h2>
                  <p className="mt-2 text-sm" style={{ color: 'rgba(226,232,240,0.5)' }}>Active · {user.businessName}</p>
                </div>
                <button onClick={() => setEditAssistant(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-sm transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}>
                  <FiEdit2 size={14}/> Edit
                </button>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                {statCards.map((s, i) => (
                  <div key={i} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.1)' }}>
                    <p className="text-xs" style={{ color: 'rgba(226,232,240,0.4)' }}>{s.label}</p>
                    <p className="text-lg font-bold mt-1" style={{ color: s.color || '#E2E8F0', textTransform: s.cap ? 'capitalize' : undefined }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Embed code */}
            <div className="rounded-[24px] p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <h3 className="font-semibold text-white mb-1">Embed on your website</h3>
              <p className="text-sm mb-4" style={{ color: 'rgba(226,232,240,0.45)' }}>Paste before the closing <code style={{ color: '#A5B4FC' }}>&lt;/body&gt;</code> tag</p>

              <div className="rounded-2xl p-4 font-mono text-sm relative" style={{ background: '#060A14', border: '1px solid rgba(99,102,241,0.2)', color: '#34D399' }}>
                <pre className="overflow-x-auto whitespace-pre-wrap break-all">{embedCode}</pre>
                <button
                  onClick={() => { navigator.clipboard.writeText(embedCode); toast.success("Copied!") }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                  style={{ background: 'rgba(99,102,241,0.2)', color: '#A5B4FC' }}>
                  <FiCopy size={14}/>
                </button>
              </div>

              <div className="mt-4 rounded-2xl p-4 text-sm" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)' }}>
                <p className="font-semibold mb-1" style={{ color: '#FCD34D' }}>Where to paste</p>
                <p style={{ color: 'rgba(253,230,138,0.75)', lineHeight: '1.6' }}>Add the script tag inside your HTML file, just before <code style={{ color: '#FCD34D' }}>&lt;/body&gt;</code>. It loads the assistant widget automatically.</p>
              </div>
            </div>
          </div>
        )}

        {/* Edit form */}
        {editAssistant && (
          <div className="space-y-5">

            <SectionCard title="Basic Information">
              <div className="space-y-3">
                {[
                  [assistantName, setAssistantName, "Assistant Name", "text"],
                  [businessName, setBusinessName, "Business Name", "text"],
                  [businessType, setBusinessType, "Business Type (e.g. E-commerce)", "text"],
                ].map(([val, setter, ph, type]) => (
                  <input key={ph} type={type} value={val} onChange={e => setter(e.target.value)}
                    placeholder={ph} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#6366F1'}
                    onBlur={e => e.target.style.borderColor = 'rgba(99,102,241,0.2)'}/>
                ))}
                <textarea rows={4} value={businessDescription} onChange={e => setBusinessDescription(e.target.value)}
                  placeholder="Business Description — what you do, your key services..."
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#6366F1'}
                  onBlur={e => e.target.style.borderColor = 'rgba(99,102,241,0.2)'}/>
              </div>
            </SectionCard>

            <SectionCard title="Appearance" subtitle="Theme and conversation tone">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(226,232,240,0.4)' }}>Theme</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {THEMES.map(t => {
                    const meta = THEME_META[t]
                    const active = theme === t
                    return (
                      <button key={t} onClick={() => setTheme(t)}
                        className="py-3 px-4 rounded-2xl text-sm font-medium capitalize transition-all flex items-center gap-2"
                        style={{
                          background: active ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${active ? '#6366F1' : 'rgba(255,255,255,0.08)'}`,
                          color: active ? '#A5B4FC' : 'rgba(226,232,240,0.6)',
                        }}>
                        <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: meta.bg, border: `2px solid ${meta.accent}`, backdropFilter: meta.blur ? 'blur(4px)' : undefined }}/>
                        {meta.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(226,232,240,0.4)' }}>Tone</p>
                <div className="grid grid-cols-3 gap-3">
                  {TONES.map(t => (
                    <button key={t} onClick={() => setTone(t)}
                      className="py-3 rounded-2xl text-sm font-medium capitalize transition-all"
                      style={{
                        background: tone === t ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${tone === t ? '#6366F1' : 'rgba(255,255,255,0.08)'}`,
                        color: tone === t ? '#A5B4FC' : 'rgba(226,232,240,0.6)',
                      }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Gemini API Key" subtitle="Required to power your assistant's AI responses">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <p className="text-sm" style={{ color: 'rgba(226,232,240,0.5)' }}>Get a free key from Google AI Studio</p>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-white text-xs font-semibold"
                  style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}>
                  Get API Key →
                </a>
              </div>
              <input type="password" placeholder="AIza..." value={geminiApiKey} onChange={e => setGeminiApiKey(e.target.value)}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#6366F1'}
                onBlur={e => e.target.style.borderColor = 'rgba(99,102,241,0.2)'}/>
              <p className="text-xs mt-2" style={{ color: 'rgba(226,232,240,0.3)' }}>Your key is encrypted and only used for generating responses.</p>
            </SectionCard>

            <SectionCard title="Navigation Pages" subtitle="Teach the assistant which pages exist on your site">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {[
                  [pageName, setPageName, "Page Name"],
                  [pagePath, setPagePath, "/path"],
                  [pageKeywords, setPageKeywords, "Keywords (comma separated)"],
                ].map(([val, setter, ph]) => (
                  <input key={ph} type="text" value={val} onChange={e => setter(e.target.value)}
                    placeholder={ph} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#6366F1'}
                    onBlur={e => e.target.style.borderColor = 'rgba(99,102,241,0.2)'}/>
                ))}
              </div>
              <button onClick={addPage}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium"
                style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)' }}>
                <FiPlus size={15}/> Add Page
              </button>

              {pages.length > 0 && (
                <div className="mt-4 space-y-2">
                  {pages.map((page, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl p-4"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.12)' }}>
                      <div>
                        <p className="font-medium text-sm text-white">{page.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#6366F1' }}>{page.path}</p>
                        {page.keywords?.length > 0 && (
                          <p className="text-xs mt-1" style={{ color: 'rgba(226,232,240,0.35)' }}>{page.keywords.join(', ')}</p>
                        )}
                      </div>
                      <button onClick={() => removePage(i)} style={{ color: '#F87171' }}><FiTrash2 size={15}/></button>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            <button onClick={saveAssistant}
              disabled={loading || !assistantName || !businessName || !businessType || !businessDescription || !geminiApiKey}
              className="w-full h-14 rounded-2xl font-semibold text-white text-base transition-all hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}>
              {loading ? "Saving…" : user.isSetupComplete ? "Update Assistant" : "Save & Launch Assistant"}
            </button>

          </div>
        )}
      </div>
    </div>
  )
}

export default Builder