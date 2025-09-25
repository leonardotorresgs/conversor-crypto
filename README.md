# 🚀 CryptoConverter

Aplicação fullstack desenvolvida em **Node.js, Express, MongoDB e React** para o desafio da Nexus.  

🔑 Funcionalidades

Registro/Login de usuários com autenticação JWT.
Conversão de Criptomoedas (via CoinGecko API) para USD e BRL.
Histórico de conversões salvas por usuário.
Favoritos para salvar criptos de interesse.

## ⚙️ Tecnologias utilizadas
### Backend
- Node.js
- Express
- MongoDB Atlas + Mongoose
- JWT (autenticação)
- CoinGecko API

### Frontend
- React
- Fetch API
- Estilização com CSS

---

## 🛠️ Como rodar localmente

### 1. Clonar o repositório

```git clone https://github.com/leonardotorresgs/cryptoconverter.git
cd cryptoconverter
```
### 2. Rodar o backend
```
cd api
npm install
npm run dev
```
### 3. Criar um arquivo .env dentro de /api
```
MONGO_URI=sua_string_do_mongo_atlas
JWT_SECRET=um_segredo_forte
PORT=5000
```
### 4. Rodar o frontend:
```
cd ../app
npm install
npm start
```
### 5. Criar um arquivo .env dentro de /app
```
REACT_APP_API_URL=http://localhost:5000
```
🌐 Deploy em Produção

Backend (Render)
URL: [https://crypto-api.onrender.com](https://crypto-api-mkbc.onrender.com)

Frontend (Vercel)
URL: [https://cryptoconverter.vercel.app](https://conversor-crypto.vercel.app/)

