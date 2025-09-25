import { useState } from "react";
import "./Auth.css";

export default function Register({ goLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API = process.env.REACT_APP_API_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Usuário registrado com sucesso!");
      goLogin();
    } else {
      alert(data.error || "Erro ao registrar");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Registrar</h1>
        <form>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="main-button"
            type="submit"
            onClick={handleRegister}
          >
            Registrar
          </button>
        </form>
        <p>
          Já tem conta?{" "}
          <button className="other-button" onClick={goLogin}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
