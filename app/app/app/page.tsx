
const people = [
  { name: "Minh Anh", age: 24, city: "TP. Hồ Chí Minh", emoji: "🌸" },
  { name: "Hoàng Nam", age: 27, city: "Đồng Nai", emoji: "🌹" },
  { name: "Ngọc Hà", age: 23, city: "Hà Nội", emoji: "💐" },
];

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#fff5f7",
      color: "#33212b",
      fontFamily: "Arial, sans-serif"
    }}>
      <header style={{
        padding: "20px 6%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "white"
      }}>
        <h2 style={{color:"#e74783"}}>
          ❤️ Thiên Đường Hẹn Hò
        </h2>
        <a href="/login" style={{
          color:"#e74783",
          fontWeight:"bold"
        }}>Đăng nhập</a>
      </header>

      <section style={{
        textAlign:"center",
        padding:"75px 20px 55px",
        background:"linear-gradient(135deg,#ffe0eb,#fff5f7)"
      }}>
        <div style={{fontSize:55}}>💕</div>
        <h1 style={{
          fontSize:"clamp(32px,6vw,55px)",
          color:"#d93678"
        }}>
          Tìm thấy một nửa yêu thương
        </h1>
        <p style={{fontSize:18,lineHeight:1.7}}>
          Kết nối chân thành – Gặp gỡ yêu thương – Hạnh phúc dài lâu.
        </p>
        <a href="/register" style={{
          display:"inline-block",
          marginTop:20,
          padding:"16px 32px",
          background:"#e74783",
          color:"white",
          borderRadius:30,
          textDecoration:"none",
          fontWeight:"bold"
        }}>
          ❤️ Tham gia miễn phí
        </a>
      </section>

      <section style={{padding:"40px 6%"}}>
        <h2 style={{textAlign:"center",color:"#d93678"}}>
          Những người đang tìm kiếm tình yêu
        </h2>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
          gap:20,
          marginTop:30
        }}>
          {people.map((person) => (
            <article key={person.name} style={{
              background:"white",
              borderRadius:20,
              padding:25,
              textAlign:"center",
              boxShadow:"0 5px 20px #e8b5c733"
            }}>
              <div style={{fontSize:65}}>{person.emoji}</div>
              <h3>{person.name}, {person.age}</h3>
              <p>📍 {person.city}</p>
              <a href="/register" style={{
                display:"inline-block",
                padding:"11px 24px",
                background:"#ffe0eb",
                color:"#d93678",
                borderRadius:20,
                textDecoration:"none"
              }}>
                Tìm hiểu
              </a>
            </article>
          ))}
        </div>
      </section>

      <footer style={{
        padding:30,
        textAlign:"center",
        background:"#fff",
        color:"#a45a78"
      }}>
        © 2026 Thiên Đường Hẹn Hò. Kết nối yêu thương ❤️
      </footer>
    </main>
  );
}
