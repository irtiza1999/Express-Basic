const express = require("express");

const app = express();
const PORT = 3000;
const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" }
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Basic Express CRUD API is running");
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const newItem = {
    id: Date.now(),
    name: req.body.name
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  items[index].name = req.body.name;
  res.json(items[index]);
});

app.delete("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});