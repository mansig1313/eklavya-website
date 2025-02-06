import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../StuCourseCompletion/StuCourseCompletion.css";

// Sample course completion data
const courses = [
  { name: "Physics", progress: 80, color: "#0088FE" },
  { name: "Chemistry", progress: 100, color: "#00C49F" },
  { name: "Mathematics", progress: 50, color: "#FFBB28" },
  { name: "Biology", progress: 100, color: "#FF8042" },
];

// Overall completion percentage (average)
const overallCompletion =
  courses.reduce((sum, course) => sum + course.progress, 0) / courses.length;

const Stu_MyCourse = () => {
  return (
    <div className="stu-body">
    <div className="stu-course-container">
      <h1 className="stu-course-title">📚 Course Completion Report</h1>

      <div className="stu-content">
        {/* Left: Pie Chart */}
        <div className="stu-pie-container">
          <h2 className="stu-chart-title">Overall Progress</h2>
          <PieChart width={650} height={350}>
            <Pie
              data={courses}
              dataKey="progress"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {courses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <p className="stu-percentage">✅ {overallCompletion.toFixed(2)}% Completed</p>
        </div>

        {/* Right: Course Completion Details */}
        <div className="stu-course-details">
          <h2 className="stu-section-title">Subject-Wise Completion</h2>
          <div className="stu-course-list">
            {courses.map((course) => (
              <div key={course.name} className="stu-course-card">
                <h3 className="stu-course-name">{course.name}</h3>
                <div className="stu-progress-bar">
                  <div
                    className="stu-progress-fill"
                    style={{ width: `${course.progress}%`, backgroundColor: course.color }}
                  ></div>
                </div>
                <span className="stu-course-progress">{course.progress}% Completed</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      </div>
  );
};

export default Stu_MyCourse;
