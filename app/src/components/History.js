import { useEffect, useState } from "react";
import "./History.css";

export default function History({ token, refreshKey }) {
  const [history, setHistory] = useState([]);
  const [historyError, setHistoryError] = useState(null);

  const fetchHistory = () => {
    if (!token) return;

    fetch("http://localhost:5000/convert/history", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHistory(data);
          setHistoryError(null);
        } else {
          console.error("Erro ao obter histórico: ", data);
          setHistory([]);
          setHistoryError(data.message || "Erro desconhecido");
        }
      })
      .catch((err) => {
        console.error("Erro na requisição: ", err);
        setHistory([]);
        setHistoryError("Falha na requisição");
      });
  };

  useEffect(() => {
    fetchHistory();
  }, [token, refreshKey]);

  if (historyError) {
    return <p className="history-error">{historyError}. Faça login novamente.</p>;
  }

  return (
    <div className="history-container">
      <h2>Histórico</h2>
      <ul className="history-list">
        {history.map((h) => (
          <li key={h._id} className="history-item">
            {h.amount} {h.crypto.toUpperCase()} → {Number(h.usd).toFixed(4)} USD /{" "}
            {Number(h.brl).toFixed(4)} BRL
          </li>
        ))}
      </ul>
    </div>
  );
}
