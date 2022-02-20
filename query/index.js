const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const courses = {};

const handleEvent = (type, data) => {
  if (type === "CourseCreated") {
    const { id, title } = data;
    courses[id] = { id, title, lessons: [] };
  }
  if (type === "LessonCreated") {
    const { id, content, courseId, status } = data;
    const course = courses[courseId];
    course.lessons.push({ id, content, status });
  }
  if (type === "LessonUpdated") {
    const { courseId, content, status, id } = data;
    const course = courses[courseId];
    const lesson = course.lessons.find((lesson) => {
      return lesson.id === id;
    });

    lesson.status = status;
    lesson.content = content;
  }
};

app.get("/courses", async (req, res) => {
  res.send(courses);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
});

app.listen(4002, async () => {
  console.log("listening on port 4002");
  try {
    const res = await axios.get("http://localhost:4005/events");

    for (let event of res.data) {
      console.log("Processing event:", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
