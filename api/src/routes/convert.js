import express from "express"
import fetch from "node-fetch"
import authMiddleware from "../middlewares/auth.js"
import Conversion from "../models/Conversion.js"

const router = express.Router()

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { crypto, amount } = req.body
    if (!crypto || !amount) return res.status(400).json({ error: "crypto e amount são obrigatórios" })

    const id = encodeURIComponent(crypto.toLowerCase())
    const resp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd,brl`)
    const data = await resp.json()

    const key = Object.keys(data)[0]
    if (!key) return res.status(404).json({ error: "Criptomoeda não encontrada na CoinGecko" })

    const priceUsd = data[key].usd
    const priceBrl = data[key].brl
    const usd = priceUsd * Number(amount)
    const brl = priceBrl * Number(amount)

    const conversion = new Conversion({
      user: req.userId,
      crypto: key,
      amount: Number(amount),
      usd,
      brl
    })
    await conversion.save()

    res.json({
      crypto: key,
      amount: Number(amount),
      usd,
      brl,
      date: conversion.date
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro ao realizar conversão" })
  }
})

router.get("/history", authMiddleware, async (req, res) => {
  try {
    const history = await Conversion.find({ user: req.userId }).sort({ date: -1 }).lean()
    res.json(history)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
