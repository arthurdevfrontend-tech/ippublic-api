const express = require("express");
const compression = require("compression");

const app = express();

// Ativa compressão máxima (gzip/brotli)
app.use(compression({ level: 9 }));

// Remove header inútil
app.disable("x-powered-by");

// CORS mínimo possível
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.set("trust proxy", true);

// Endpoint principal (retorna só o IP puro, menor tamanho possível)
app.get("/", (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.ip.replace("::ffff:", "");

  res.type("text/plain").send(ip);
});

// Endpoint de teste ultra leve (0 bytes de body)
app.get("/ping", (req, res) => res.status(204).end());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});
