
"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    setMessage(
      "Giao diện đăng nhập đã sẵn sàng. Bước tiếp theo sẽ kết nối hệ thống tài khoản."
    );
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      background: "#fff5f7"
    }}>
      <form onSubmit={handleLogin} style={{
        width: "100%",
        maxWidth: 420,
        background: "white",
        padding: 28,
        borderRadius: 18,
        boxShadow: "0 5px 25px #00000012"
      }}>
        <h1 style={{ color: "#e84b78", textAlign: "center" }}>
          Đăng nhập
        </h1>

        <p style={{ textAlign: "center", color: "#777" }}>
          Chào mừng bạn trở lại Thiên Đường Hẹn Hò
        </p>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Nhập email"
          style={inputStyle}
        />

        <label>Mật khẩu</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Nhập mật khẩu"
          style={inputStyle}
        />

        <button type="submit" style={{
          width: "100%",
          padding: 14,
          marginTop: 20,
          border: "none",
          borderRadius: 10,
          background: "#e84b78",
          color: "white",
          fontSize: 16,
          fontWeight: "bold"
        }}>
          Đăng nhập
        </button>

        {message && (
          <p style={{ color: "#e84b78", textAlign: "center" }}>
            {message}
          </p>
        )}

        <p style={{ textAlign: "center", marginTop: 20 }}>
          Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
        </p>
      </form>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: 13,
  marginTop: 8,
  marginBottom: 16,
  border: "1px solid #ddd",
  borderRadius: 9,
  fontSize: 15
};
