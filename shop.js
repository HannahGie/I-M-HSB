const express = require('express');
const app   = express();
const port  = 8000;

app.use(express.json());
app.use(express.static('.'));

let catalog = [
  { name: "Goblin Energy Drink", price: 4.99 },
  { name: "Emotional Support USB", price: 12.50 },
  { name: "Battle-Ready Coffee",   price: 7.75 },
  { name: "Brau-Bachler Cookies", price: 1024.42}
];

app.get('/catalog', (req, res) => res.json(catalog));

app.post('/add', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).json({ error: "Name und Preis erforderlich" });

  if (catalog.some(p => p.name === name))
    return res.status(409).json({ error: "Produkt existiert bereits" });

  catalog.push({ name, price: Number(price) });
  res.status(201).json({ message: "Hinzugefügt", catalog });
});

app.delete('/remove/:name', (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const originalLen = catalog.length;
  catalog = catalog.filter(p => p.name !== name);

  if (catalog.length === originalLen)
    return res.status(404).json({ error: "Produkt existiert nicht" });

  res.json({ message: "Gelöscht", catalog });
});

app.listen(port, () =>
  console.log(`Server running → http://localhost:${port}`)
);
