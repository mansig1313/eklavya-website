import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseDetails.css";
import { motion } from "framer-motion";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const studentEmail = localStorage.getItem("email") || "";

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!studentEmail) {
        console.log("No student email found, redirecting to login...");
        navigate("/login");
        return;
      }
      try {
        console.log(`Fetching course details for ID: ${courseId} with email: ${studentEmail}`);
        const courseResponse = await axios.get(`http://localhost:5000/courses/${courseId}`);
        console.log("Course response:", courseResponse.data);
        setCourse(courseResponse.data);
      } catch (err) {
        console.error("Error fetching course details:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Failed to load course details");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [courseId, navigate]);

  const handleStartTest = (testId) => {
    navigate(`/courses/${courseId}/tests/${testId}`);
  };

  if (loading) return <div className="course-details-loading">Loading...</div>;
  if (error) return <div className="course-details-error">Error: {error}</div>;
  if (!course) return <div className="course-details-error">No course data available.</div>;

  return (
    <div className="course-details">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {course.subject} ({course.standard})
      </motion.h1>
      <div className="details-container">
        <motion.div
          className="section tests"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2>Tests</h2>
          {course.tests && course.tests.length > 0 ? (
            course.tests.map((test) => (
              <motion.div
                key={test._id}
                className="test-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="test-info">
                  <span>{test.name}</span>
                  <span>{test.duration}</span>
                </div>
                <motion.button
                  className="start-test-btn"
                  onClick={() => handleStartTest(test._id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Test
                </motion.button>
              </motion.div>
            ))
          ) : (
            <p>No tests available.</p>
          )}
        </motion.div>

        <motion.div
          className="section resources"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Resources</h2>
          {course.resources && course.resources.length > 0 ? (
            course.resources.map((res, i) => (
              <motion.a
                key={i}
                href={res}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
                whileHover={{ scale: 1.05, color: "#3498db" }}
              >
                {res.split("/").pop()}
              </motion.a>
            ))
          ) : (
            <p>No resources available.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetails;