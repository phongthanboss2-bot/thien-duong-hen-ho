'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

type Profile = {
  id: string
  display_name: string
  birth_date: string | null
  gender: string | null
  city: string | null
  bio: string | null
}

function getAge(dateStr: string | null) {
  if (!dateStr) return null
  const birth = new Date(dateStr)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

const genderLabel: Record<string, string> = {
  nam: 'Nam',
  nu: 'Nữ',
  khac: 'Khác',
}

export default function DiscoverPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data: sessionData } = await supabase.auth.getSession()
      const user = sessionData.session?.user
      if (!user) {
        setLoading(false)
        return
      }
      setUserId(user.id)

      const { data: myLikes } = await supabase
        .from('likes')
        .select('to_user_id')
        .eq('from_user_id', user.id)
      const liked = new Set((myLikes ?? []).map((l) => l.to_user_id))

      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, birth_date, gender, city, bio')
        .neq('id', user.id)
        .limit(50)

      if (error) {
        setError('Không tải được danh sách: ' + error.message)
        setLoading(false)
        return
      }
      setProfiles((data ?? []).filter((p) => !liked.has(p.id)))
      setLoading(false)
    }
    load()
  }, [])

  async function handleLike(target: Profile) {
    if (!userId) return
    setError('')
    setMessage('')

    const { error } = await supabase
      .from('likes')
      .insert({ from_user_id: userId, to_user_id: target.id })

    if (error) {
      setError('Không thích được: ' + error.message)
      return
    }

    const { data: match } = await supabase
      .from('matches')
      .select('id')
      .or(
        `and(user_a.eq.${userId},user_b.eq.${target.id}),and(user_a.eq.${target.id},user_b.eq.${userId})`
      )
      .maybeSingle()

    setProfiles((prev) => prev.filter((p) => p.id !== target.id))
    setMessage(
      match
        ? `🎉 Bạn và ${target.display_name} đã ghép đôi!`
        : `Đã thích ${target.display_name}`
    )
  }

  if (loading) {
    return <main style={{ padding: 24 }}>Đang tải...</main>
  }

  if (!userId) {
    return (
      <main style={{ maxWidth: 400, margin: '40px auto', padding: 16 }}>
        <p>Bạn cần đăng nhập để khám phá.</p>
        <Link href="/login">Đăng nhập</Link>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
      <h1>Khám phá</h1>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {profiles.length === 0 ? (
        <p>Hiện chưa có hồ sơ nào mới để hiển thị.</p>
      ) : (
        profiles.map((p) => {
          const age = getAge(p.birth_date)
          return (
            <div
              key={p.id}
              style={{
                background: '#fff',
                border: '1px solid #f0c0d0',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
              }}
            >
              <h3 style={{ margin: '0 0 4px' }}>
                {p.display_name}
                {age !== null ? `, ${age}` : ''}
              </h3>
              <p style={{ margin: '0 0 8px', color: '#666' }}>
                {[p.gender ? genderLabel[p.gender] ?? p.gender : null, p.city]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
              {p.bio && <p style={{ margin: '0 0 12px' }}>{p.bio}</p>}
              <button
                onClick={() => handleLike(p)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  background: '#e91e63',
                  color: '#fff',
                  border: 'none',
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                ❤️ Thích
              </button>
            </div>
          )
        })
      )}

      <p>
        <Link href="/">Về trang chủ</Link> ·{' '}
        <Link href="/profile">Hồ sơ của tôi</Link>
      </p>
    </main>
  )
}
