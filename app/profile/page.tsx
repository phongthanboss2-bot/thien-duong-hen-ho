'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

function isAdult(dateStr: string) {
  const birth = new Date(dateStr)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age >= 18
}

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('')
  const [city, setCity] = useState('')
  const [bio, setBio] = useState('')
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
      const { data } = await supabase
        .from('profiles')
        .select('display_name, birth_date, gender, city, bio')
        .eq('id', user.id)
        .maybeSingle()
      if (data) {
        setDisplayName(data.display_name ?? '')
        setBirthDate(data.birth_date ?? '')
        setGender(data.gender ?? '')
        setCity(data.city ?? '')
        setBio(data.bio ?? '')
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!userId) return
    if (!displayName.trim()) {
      setError('Vui lòng nhập tên hiển thị.')
      return
    }
    if (!birthDate) {
      setError('Vui lòng nhập ngày sinh.')
      return
    }
    if (!isAdult(birthDate)) {
      setError('Bạn phải đủ 18 tuổi để sử dụng website.')
      return
    }

    setSaving(true)
    const { error } = await supabase.from('profiles').upsert({
      id: userId,
      display_name: displayName.trim(),
      birth_date: birthDate,
      gender: gender || null,
      city: city.trim() || null,
      bio: bio.trim() || null,
    })
    setSaving(false)

    if (error) {
      setError('Không lưu được: ' + error.message)
      return
    }
    setMessage('Đã lưu hồ sơ của bạn!')
  }

  const input = {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 16,
    boxSizing: 'border-box' as const,
  }

  if (loading) {
    return <main style={{ padding: 24 }}>Đang tải...</main>
  }

  if (!userId) {
    return (
      <main style={{ maxWidth: 400, margin: '40px auto', padding: 16 }}>
        <p>Bạn cần đăng nhập để chỉnh sửa hồ sơ.</p>
        <Link href="/login">Đăng nhập</Link>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 400, margin: '40px auto', padding: 16 }}>
      <h1>Hồ sơ của bạn</h1>
      <form onSubmit={handleSave}>
        <label>Tên hiển thị</label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Tên bạn muốn mọi người thấy"
          style={input}
        />

        <label>Ngày sinh (phải từ 18 tuổi)</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          style={input}
        />

        <label>Giới tính</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={input}
        >
          <option value="">Chưa chọn</option>
          <option value="nam">Nam</option>
          <option value="nu">Nữ</option>
          <option value="khac">Khác</option>
        </select>

        <label>Thành phố</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ví dụ: Hà Nội"
          style={input}
        />

        <label>Giới thiệu bản thân</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          placeholder="Vài dòng về bạn"
          style={input}
        />

        <button
          type="submit"
          disabled={saving}
          style={{ ...input, background: '#e91e63', color: '#fff', border: 'none' }}
        >
          {saving ? 'Đang lưu...' : 'Lưu hồ sơ'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <p>
        <Link href="/">Về trang chủ</Link>
      </p>
    </main>
  )
}
