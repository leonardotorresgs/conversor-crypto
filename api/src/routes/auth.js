import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios' })
    
        const exists = await User.findOne({ email })
        if (exists) return res.status(400).json({ error: 'Usuário já existe' })

        const hashed = await bcrypt.hash(password, 10)
        const user = new User({ email, password: hashed, favorites: [] })
        await user.save()

        res.status(201).json({ msg: 'Usuário criado', userId: user._id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios' })

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ error: 'Usuário não encontrado' })

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return res.status(400).json({ error: 'Senha incorreta' })

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        )
        res.json({ token })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router
