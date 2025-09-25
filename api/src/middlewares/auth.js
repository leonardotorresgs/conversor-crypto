import jwt from "jsonwebtoken"

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.status(401).json({ error: 'Token ausente' })

    const token = authHeader.startsWith("Bearer ")
     ? authHeader.split(" ")[1]
     : authHeader

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = payload.id
        next()
    } catch (err) {
        console.error("Erro no verify:", err.message)
        return res.status(401).json({ error: 'Token inválido' })
    }
}