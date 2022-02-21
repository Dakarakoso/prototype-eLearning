const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const port = "4003";

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "LessonCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios
      .post("http://event-bus-srv:4005/events", {
        type: "LessonModerated",
        data: {
          id: data.id,
          courseId: data.courseId,
          status,
          content: data.content,
        },
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  res.send({});
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
