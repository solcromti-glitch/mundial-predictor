const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let predictions = [];

// Guardar predicción
app.post("/prediction", (req, res) => {
  const pred = req.body;
  predictions.push(pred);
  res.send({ ok: true });
});

// Obtener todas
app.get("/predictions", (req, res) => {
  res.send(predictions);
});

// Calcular ranking
app.post("/ranking", (req, res) => {
  const results = req.body;

  const scoring = {
    champion: 10,
    topScorer: 8,
    bestPlayer: 8,
    surprise: 6,
    disappointment: 6,
    revelation: 5,
    playerDisappointment: 5
  };

  const ranking = predictions.map(p => {
    let score = 0;

    for (let key in scoring) {
      if (p[key] === results[key]) {
        score += scoring[key];
      }
    }

    return { name: p.name, score };
  });

  ranking.sort((a, b) => b.score - a.score);
  res.send(ranking);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Backend listo 🚀"));
