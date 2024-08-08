const sequelize = require("./database");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};
const User = require("./User");
const { body, validationResult } = require("express-validator");

sequelize.sync().then(() => console.log("db is ready"));

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api/continents", (req, res) => {
  res.json({
    continents: ["Afryka", "Ameryka Południowa", "Ameryka Północna", "Antarktyda", "Australia", "Azja", "Europa"],
  });
});

app.post(
  "/api/form",

  body("firstName").notEmpty().withMessage("To pole jest wymagane"),
  body("lastName").if(body("continent").equals("Europa")).isLength({ min: 2 }).withMessage("Nie spełnione kryteria"),
  body("dateOfBirth").isBefore(new Date().toString()).withMessage("Data urodzenia jest większa niż dzisiejsza data"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    await User.create(req.body);
    res.send({ status: "user is insterted" });
  }
);

app.get("/api/form", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

app.get("/api/form/:id", async (req, res) => {
  const requestedId = req.params.id;
  const user = await User.findOne({ where: { id: requestedId } });
  res.send(user);
});

app.delete("/api/form/:id", async (req, res) => {
  const requestedId = req.params.id;
  await User.destroy({ where: { id: requestedId } });
  res.send({ status: "user got removed" });
});

app.listen(8080, () => {
  console.log("server started on port 8080");
});
