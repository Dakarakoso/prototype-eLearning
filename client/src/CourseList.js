import React, { useState, useEffect } from "react";
import axios from "axios";
import LessonCreate from "./LessonCreate";
import LessonList from "./LessonList";

const CourseList = () => {
  const [courses, setCourses] = useState({});

  const fetchData = async () => {
    const res = await axios.get("http://localhost:4002/courses");
    // console.log(res.data);
    setCourses(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderedCourses = Object.values(courses).map((course) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={course.id}
      >
        <div className="card-body">
          <h3>{course.title}</h3>
          <LessonList lessons={course.lessons} />
          <LessonCreate courseId={course.id} />
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedCourses}
    </div>
  );
};

export default CourseList;
