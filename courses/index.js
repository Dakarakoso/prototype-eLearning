const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const courses = {};

app.get("/courses", (req, res) => {
  res.send(courses);
});

app.post("/courses", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  courses[id] = {
    id,
    title,
  };

  await axios
    .post("http://localhost:4005/events", {
      type: "CourseCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => {
      console.log(err.message);
    });
  res.status(201).send(courses[id]);
});

app.post("/events", (req, res) => {
  console.log("received Event", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
