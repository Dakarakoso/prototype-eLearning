const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const lessonsByCourseId = {};

app.get("/courses/:id/lessons", (req, res) => {
  res.send(lessonsByCourseId[req.params.id] || []);
});

app.post("/courses/:id/lessons", async (req, res) => {
  const lessonId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const lessons = lessonsByCourseId[req.params.id] || [];
  lessons.push({ id: lessonId, content, status: "pending" });
  lessonsByCourseId[req.params.id] = lessons;

  await axios
    .post("http://localhost:4005/events", {
      type: "LessonCreated",
      data: {
        id: lessonId,
        content,
        courseId: req.params.id,
        status: "pending",
      },
    })
    .catch((err) => {
      console.log(err.message);
    });
  res.status(201).send(lessons);
});

app.post("/events", async (req, res) => {
  console.log("received Event", req.body.type);
  const { type, data } = req.body;
  if (type === "LessonModerated") {
    const { id, status, courseId, content } = data;

    const lessons = lessonsByCourseId[courseId];
    const lesson = lessons.find((lesson) => {
      return lesson.id === id;
    });
    lesson.status = status;

    await axios
      .post("http://localhost:4005/events", {
        type: "LessonUpdated",
        data: {
          id,
          status,
          courseId,
          content,
        },
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("listening on port 4001");
});
