import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyCourses.css";
import { motion } from "framer-motion";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const studentEmail = localStorage.getItem("email") || "";

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!studentEmail) {
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/student/courses?studentEmail=${studentEmail}`);
        setCourses(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, [navigate]);

  const handleCourseClick = (courseId) => {
    navigate(`/course-details/${courseId}`);
  };

  if (loading) return <div className="my-courses-loading">Loading...</div>;
  if (error) return <div className="my-courses-error">Error: {error}</div>;

  return (
    <div className="my-courses">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Enrolled Courses
      </motion.h1>
      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <motion.div
              key={course._id}
              className="course-card"
              onClick={() => handleCourseClick(course._id)}
              whileHover={{ scale: 1.05, boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3>{course.subject} ({course.standard})</h3>
              <p><strong>Overview:</strong> {course.overview}</p>
              <p><strong>Lecture Days:</strong> {course.lectureDays.join(", ")}</p>
              <p><strong>Price:</strong> ${course.price}</p>
            </motion.div>
          ))
        ) : (
          <p>No courses enrolled yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;