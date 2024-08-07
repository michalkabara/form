const sequelize = require("./database");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};
const User = require("./User");

sequelize.sync().then(() => console.log("db is ready"));

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api/continents", (req, res) => {
  res.json({
    continents: ["Afryka", "Ameryka Południowa", "Ameryka Północna", "Antarktyda", "Australia", "Azja", "Europa"],
  });
});

app.post("/api/form", async (req, res) => {
  await User.create(req.body);
  res.send("user is insterted");
});

app.get("/api/form", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

app.listen(8080, () => {
  console.log("server started on port 8080");
});
