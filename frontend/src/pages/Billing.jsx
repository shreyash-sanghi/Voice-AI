import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { ServerUrl } from '../App'
import { HiOutlineSparkles, HiOutlineCheck } from 'react-icons/hi'
import { HiOutlineBolt } from 'react-icons/hi2'

const FREE_FEATURES = [
  "200 AI messages",
  "Voice assistant",
  "Navigation support",
  "Basic customization",
]

const PRO_FEATURES = [
  "Unlimited AI messages",
  "Advanced AI responses",
  "Priority performance",
  "Unlimited navigation",
  "Premium support",
  "3 months access",
]

function Billing({ user, setUser }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !user.isSetupComplete) {
      toast.error("Set up your assistant first")
      navigate("/builder")
    }
  }, [])

  const remainingMessages = Math.max(0, (user?.requestLimit || 0) - (user?.totalMessages || 0))
  const remainingDays = user?.proExpiresAt
    ? Math.max(0, Math.ceil((new Date(user.proExpiresAt) - new Date()) / (1000 * 60 * 60 * 24)))
    : 0

  const handlePay = async () => {
    try {
      const res = await axios.post(ServerUrl + "/api/billing/order", { plan: "pro" }, { withCredentials: true })
      const order = res.data.order
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "VoiceAI",
        description: "Pro Plan – 3 Months",
        order_id: order.id,
        handler: async (response) => {
          const verifyRes = await axios.post(ServerUrl + "/api/billing/verify", response, { withCredentials: true })
          if (verifyRes.data.success) {
            toast.success("Payment successful! Welcome to Pro.")
            setUser(verifyRes.data.user)
          }
        },
        theme: { color: "#6366F1" },
      }
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch {
      toast.error("Payment failed. Try again.")
    }
  }

  const statCards = [
    { label: 'Current Plan', value: user?.plan, cap: true },
    {
      label: 'Gemini Status',
      value: user?.geminiStatus,
      cap: true,
      color: user?.geminiStatus === 'active' ? '#34D399' : user?.geminiStatus === 'invalid' ? '#F87171' : '#FBBF24',
    },
    {
      label: user?.plan === 'free' ? 'Messages Left' : 'Plan Expiry',
      value: user?.plan === 'free' ? remainingMessages : `${remainingDays} days`,
    },
  ]

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: '#0A0F1E' }}>
      {/* Glow */}
      <div className="fixed pointer-events-none" style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.1), transparent 70%)' }}/>

      <div className="relative max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#6366F1' }}>Subscription</p>
          <h2 className="text-3xl font-bold text-white">Billing & Plans</h2>
          <p className="mt-1 text-sm" style={{ color: 'rgba(226,232,240,0.45)' }}>Manage your plan and usage</p>
        </div>

        {/* Usage stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {statCards.map((s, i) => (
            <div key={i} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <p className="text-xs" style={{ color: 'rgba(226,232,240,0.4)' }}>{s.label}</p>
              <p className="text-xl font-bold mt-1" style={{ color: s.color || '#E2E8F0', textTransform: s.cap ? 'capitalize' : undefined }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Free */}
          <div className="rounded-[28px] p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(226,232,240,0.4)' }}>Free Plan</p>
            </div>
            <p className="text-5xl font-black text-white">₹0</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(226,232,240,0.4)' }}>Forever free</p>

            <div className="mt-8 space-y-3">
              {FREE_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(226,232,240,0.65)' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.15)' }}>
                    <HiOutlineCheck size={12} style={{ color: '#6366F1' }}/>
                  </span>
                  {f}
                </div>
              ))}
            </div>

            {user?.plan === 'free' && (
              <div className="mt-8 py-3 rounded-2xl text-center text-sm font-medium" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: '#A5B4FC' }}>
                Current Plan
              </div>
            )}
          </div>

          {/* Pro */}
          <div className="rounded-[28px] p-8 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(6,182,212,0.15))', border: '1px solid rgba(99,102,241,0.4)' }}>
            <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)' }}/>

            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#A5B4FC' }}>Pro Plan</p>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(99,102,241,0.3)', color: '#C7D2FE' }}>
                Popular
              </span>
            </div>
            <p className="text-5xl font-black text-white">₹699</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(226,232,240,0.5)' }}>3 months access</p>

            <div className="mt-8 space-y-3">
              {PRO_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(226,232,240,0.8)' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.3)' }}>
                    <HiOutlineCheck size={12} style={{ color: '#A5B4FC' }}/>
                  </span>
                  {f}
                </div>
              ))}
            </div>

            <button
              onClick={handlePay}
              disabled={user?.plan === 'pro'}
              className="relative mt-8 w-full h-13 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-default"
              style={{
                background: user?.plan === 'pro' ? 'rgba(255,255,255,0.15)' : 'white',
                color: user?.plan === 'pro' ? '#E2E8F0' : '#0A0F1E',
                boxShadow: user?.plan !== 'pro' ? '0 0 30px rgba(255,255,255,0.15)' : undefined,
              }}>
              {user?.plan === 'pro' ? '✓ Active Plan' : 'Upgrade to Pro'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billing