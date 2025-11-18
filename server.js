const express = require("express");
const cors = require("cors");
const compression = require("compression"); // ← importar

const app = express();

app.use(compression()); // ← ativar compressão GZIP
app.use(cors());

app.set("trust proxy", true);

app.get("/", (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.ip ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    (req.connection?.socket ? req.connection.socket.remoteAddress : null);

  res.json({ ip });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API de IP público online na porta ${PORT}`);
});
