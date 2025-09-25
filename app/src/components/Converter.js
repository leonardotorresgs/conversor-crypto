import { useState, useEffect } from "react";
import History from "./History";
import "./Converter.css";

function FavoritesList({ favorites, onSelect }) {
  return (
    <div className="favorites-column">
      <h3>Favoritos</h3>
      <ul>
        {favorites.map((fav) => (
          <li
            key={fav.cryptoId}
            onClick={() => onSelect(fav)}
            className="favorite-item"
          >
            ⭐ {fav.symbol.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Converter({ token, onLogout }) {
  const [cryptoList, setCryptoList] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [refreshHistory, setRefreshHistory] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1"
        );
        const data = await res.json();
        setCryptoList(data);
      } catch (err) {
        console.error("Erro ao buscar moedas:", err);
      }
    };
    fetchCryptos();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await fetch("http://localhost:5000/favorites", {
        headers: { Authorization: "Bearer " + token }
      });
      const data = await res.json();
      if (res.ok) setFavorites(data);
    };
    fetchFavorites();
  }, [token]);

  useEffect(() => {
    const results = cryptoList.filter((c) =>
      c.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results.slice(0, 20));
  }, [search, cryptoList]);

  const handleConvert = async () => {
    if (!selectedCrypto) {
      alert("Escolha uma criptomoeda pelo símbolo");
      return;
    }

    const res = await fetch("http://localhost:5000/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ crypto: selectedCrypto.id, amount }),
    });
    const data = await res.json();
    if (res.ok) {
      setResult(data);
      setRefreshHistory((prev) => prev + 1);
    } else {
      alert(data.error || "Erro na conversão");
    }
  };

  const handleFavorite = async () => {
    if (!selectedCrypto) return;

    const res = await fetch("http://localhost:5000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        cryptoId: selectedCrypto.id,
        symbol: selectedCrypto.symbol
      })
    });

    const data = await res.json();
    if (res.ok) {
      setFavorites(data);
    } else {
      alert(data.error || "Erro ao favoritar");
    }
  };

  return (
    <div>
      <header className="converter-header">
        <h2>CryptoConverter</h2>
        <div className="header-right">
          <span>Conversion</span>
          <button onClick={onLogout}>Sair</button>
        </div>
      </header>

      <main className="converter-main">
        <p className="subtitle">Converta de um jeito fácil</p>
        <h3 className="title">
          Fique à frente com insights{" "}
          <span className="gradient-text">cryptos</span> em tempo real
        </h3>

        <div className="converter-container">
          <div className="converter-left">
            <input
              type="text"
              placeholder="Digite o símbolo (ex: btc, eth, ada)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <ul className="search-results">
                {filtered.map((c) => (
                  <li
                    key={c.id}
                    onClick={() => {
                      setSelectedCrypto(c);
                      setSearch(c.symbol.toUpperCase());
                      setFiltered([]);
                    }}
                  >
                    {c.symbol.toUpperCase()} — {c.name} (${c.current_price})
                  </li>
                ))}
              </ul>
            )}

            {selectedCrypto && (
              <button onClick={handleFavorite} className="favorite-button">
                ⭐
              </button>
            )}

            <div className="amount-section">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="amount-input"
              />
              <button onClick={handleConvert} className="convert-button">
                Converter
              </button>
            </div>

            <div className="result-section">
              {result ? (
                <>
                  <p className="result">
                    {Number(result.usd).toFixed(4)} USD
                  </p>
                  <p className="result">
                    {Number(result.brl).toFixed(4)} BRL
                  </p>
                </>
              ) : (
                <p>Faça uma conversão para ver os resultados.</p>
              )}
            </div>
          </div>

          <div className="converter-right">
            <History token={token} refreshKey={refreshHistory} />
          </div>
        </div>
        <div className="converter-favorites">
          <FavoritesList
            favorites={favorites}
            onSelect={(fav) => {
              setSelectedCrypto({ id: fav.cryptoId, symbol: fav.symbol });
              setSearch(fav.symbol.toUpperCase());
            }}
          />
        </div>
      </main>
    </div>
  );
}
