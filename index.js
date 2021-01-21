const express = require("express");
const app = express();
const cors = require('cors')

app.use(express.json());
const morgan = require("morgan");
morgan.token("custom", (req, res) => {
  return "POST" === req.method ? JSON.stringify(req.body) : " ";
});

app.use(cors())

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :custom"
  )
);

let notes = [
  {
    id: 1,
    name: "mudit",
    number: 92182318,
  },
  {
    id: 2,
    name: "mudit",
    number: 92182318,
  },
  {
    id: 3,
    name: "mudit",
    number: 92182318,
  },
  {
    id: 4,
    name: "mudit",
    number: 92182318,
  },
];
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.get("/api/persons", (req, res) => {
  res.json(notes);
});

app.get("/info", (req, res) => {
  const response = `
    <p>Phonebook has ${notes.length} people</p>
    ${new Date()}
    `;

  res.send(response);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = notes.find((x) => x.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const np = notes.filter((x) => x.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  const item = notes.find((x) => x.name === name);
  if (item) {
    return res.status(400).json({
      error: "name already exists",
    });
  }
  const person = {
    id: getRandomInt(1000000),
    name,
    number,
  };

  notes = notes.concat(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}!!!`);
});
