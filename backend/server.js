const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let predictions = [];

app.post("/prediction", (req, res) => {
  predictions.push(req.body);
  res.send({ ok: true });
});

app.get("/predictions", (req, res) => {
  res.send(predictions);
});

app.post("/calculate", (req, res) => {
  const results = req.body;

  const ranking = predictions.map(p => {
    let score = 0;

    if (p.champion === results.champion) score += 10;
    if (p.topScorer === results.topScorer) score += 8;
    if (p.bestPlayer === results.bestPlayer) score += 8;

    return { name: p.name, score };
  });

  ranking.sort((a, b) => b.score - a.score);

  res.send(ranking);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Servidor listo 🚀"));
