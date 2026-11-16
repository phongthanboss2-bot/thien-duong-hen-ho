'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

const button = {
  padding: '12px 24px',
  borderRadius: 8,
  background: '#e91e63',
  color: '#fff',
  textDecoration: 'none',
  fontSize: 16,
  border: 'none',
  cursor: 'pointer',
}

export default function HomePage() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null)
      setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setEmail(session?.user.email ?? null)
      }
    )
    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (
    <main
      style={{ maxWidth: 480, margin: '0 auto', padding: 24, textAlign: 'center' }}
    >
      <h1>💖 Thiên Đường Hẹn Hò</h1>
      <p>Nơi bạn gặp gỡ và kết nối với những người phù hợp.</p>

      {loading ? (
        <p>Đang tải...</p>
      ) : email ? (
        <div style={{ marginTop: 24 }}>
          <p>
            Xin chào, <strong>{email}</strong>
          </p>
          <button onClick={handleLogout} style={button}>
            Đăng xuất
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            marginTop: 24,
          }}
        >
          <Link href="/register" style={button}>
            Đăng ký
          </Link>
          <Link href="/login" style={button}>
            Đăng nhập
          </Link>
        </div>
      )}
    </main>
  )
}
