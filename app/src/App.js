import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Converter from "./components/Converter";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [page, setPage] = useState(token ? "converter" : "login");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setPage("login");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      {!token && page === "login" && (
        <Login setToken={setToken} goRegister={() => setPage("register")} />
      )}
      {!token && page === "register" && (
        <Register goLogin={() => setPage("login")} />
      )}

      {token && (
        <>
          <Converter token={token} onLogout={handleLogout} />
        </>
      )}
    </div>
  );
}

export default App;
