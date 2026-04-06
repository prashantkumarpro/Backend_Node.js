import express from "express";

const app = express();

app.get(/^\/(\d+)$/, (req, res) => {
  res.json({ double: req.params[0] * 2 });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
