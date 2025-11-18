const express = require("express");
const app = express();

app.set("trust proxy", true);


// Rota principal: retorna o IP público do usuário/visitante
app.get("/", (req, res) => {

  // Pega o IP real mesmo atrás de proxies (Heroku, Vercel, Render, etc.)
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.ip ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    (req.connection?.socket ? req.connection.socket.remoteAddress : null);

  res.json({ ip });
});

// Porta usada pelo Heroku ou 3000 localmente
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API de IP público rodando na porta ${PORT}`);
});
