import { useState } from "react";
import "./Auth.css";

export default function Login({ setToken, goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API = process.env.REACT_APP_API_URL;
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } else {
      alert(data.error || "Erro no login");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
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
          <button className="main-button" type="submit" onClick={handleLogin}>
            Entrar
          </button>
        </form>
        <p>
          Não tem conta?{" "}
          <button className="other-button" onClick={goRegister}>
            Registrar
          </button>
        </p>
      </div>
    </div>
  );
}
