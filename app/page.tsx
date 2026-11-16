import Link from 'next/link'

const button = {
  padding: '12px 24px',
  borderRadius: 8,
  background: '#e91e63',
  color: '#fff',
  textDecoration: 'none',
  fontSize: 16,
}

export default function HomePage() {
  return (
    <main
      style={{ maxWidth: 480, margin: '0 auto', padding: 24, textAlign: 'center' }}
    >
      <h1>💖 Thiên Đường Hẹn Hò</h1>
      <p>Nơi bạn gặp gỡ và kết nối với những người phù hợp.</p>
      <div
        style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}
      >
        <Link href="/register" style={button}>
          Đăng ký
        </Link>
        <Link href="/login" style={button}>
          Đăng nhập
        </Link>
      </div>
    </main>
  )
}
