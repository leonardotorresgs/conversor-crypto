import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./src/routes/auth.js"
import convertRoutes from "./src/routes/convert.js"
import favoritesRoutes from "./src/routes/favorites.js"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/convert', convertRoutes)
app.use('/favorites', favoritesRoutes)

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectou ao banco')
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
    })
    .catch((err) => {
        console.error('Erro ao conectar com o banco: ', err)
        process.exit(1)
    })
