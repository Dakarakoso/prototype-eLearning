import React from "react";
import CourseCreate from "./CourseCreate";
import CourseList from "./CourseList";

const App = () => {
  return (
    <div className="container">
      <h1>Create course</h1>
      <CourseCreate />
      <hr />
      <h1>Courses</h1>
      <CourseList />
    </div>
  );
};

export default App;
