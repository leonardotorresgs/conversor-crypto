import express from "express";
import authMiddleware from "../middlewares/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).lean();
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    res.json(user.favorites || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar favoritos" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { cryptoId, symbol } = req.body;
    if (!cryptoId || !symbol) {
      return res
        .status(400)
        .json({ error: "cryptoId e symbol são obrigatórios" });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const exists = user.favorites.find((fav) => fav.cryptoId === cryptoId);

    if (exists) {
      user.favorites = user.favorites.filter(
        (fav) => fav.cryptoId !== cryptoId
      );
    } else {
      user.favorites.push({ cryptoId, symbol });
    }

    await user.save();
    res.json(user.favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar favoritos" });
  }
});

export default router;
