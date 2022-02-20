import React from "react";

const LessonList = ({ lessons }) => {
  const renderedLessons = lessons.map((lesson) => {
    let content;
    if (lesson.status === "approved") {
      content = lesson.content;
    }
    if (lesson.status === "pending") {
      content = "Please wait";
    }
    if (lesson.status === "rejected") {
      content = "This lesson is not possible";
    }

    return <li key={lesson.id}>{content}</li>;
  });
  return <ul>{renderedLessons}</ul>;
};

export default LessonList;
