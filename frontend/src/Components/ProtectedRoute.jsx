import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ user, loading, children }) {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0F1E' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full animate-spin" style={{ border: '2px solid rgba(99,102,241,0.15)', borderTop: '2px solid #6366F1' }}/>
            <div className="absolute inset-2 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))' }}/>
          </div>
          <p className="text-sm font-medium" style={{ color: 'rgba(226,232,240,0.5)' }}>Loading…</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return children
}

export default ProtectedRoute