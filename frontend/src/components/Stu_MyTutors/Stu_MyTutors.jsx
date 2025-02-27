import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import axios from "axios";
import "./Stu_MyTutors.css"; // Renamed for clarity
import myImage from "../Stu_MyTutors/mytutor.png";
import { useNavigate } from "react-router-dom";

function MyTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const studentEmail = localStorage.getItem("email") || "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutors = async () => {
      if (!studentEmail) {
        console.log("No student email found, redirecting to login...");
        navigate("/login");
        return;
      }
      try {
        console.log(`Fetching tutors for student: ${studentEmail}`);
        const response = await axios.get(`http://localhost:5000/api/student/tutors?studentEmail=${studentEmail}`);
        console.log("Tutors response:", response.data);
        setTutors(response.data);
      } catch (err) {
        console.error("Error fetching tutors:", err);
        setError(err.response?.data?.error || "Failed to fetch tutors");
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, [navigate]);

  if (loading) return <div className="my-tutors-loading">Loading...</div>;
  if (error) return <div className="my-tutors-error">Error: {error}</div>;

  return (
    <div className="my-tutors-main-container">
      {/* Left Container */}
      <motion.div
        className="left-container"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src={myImage} alt="Tutoring Session" className="left-container-image" />
      </motion.div>

      {/* Right Container */}
      <div className="right-container">
        <motion.div
          className="heading-container"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="page-title">
            <FaChalkboardTeacher className="icon" />
            My Tutors
          </h1>
          <p className="tagline">"Your learning journey, guided by the best minds!"</p>
        </motion.div>

        {/* Tutors List */}
        <div className="tutors-list">
          {tutors.length > 0 ? (
            tutors.map((tutor, index) => (
              <motion.div
                className="tutor-card"
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05, boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)" }}
              >
                <img src={tutor.profilePicture} alt={`${tutor.name}'s profile`} className="tutor-image" />
                <div className="tutor-details">
                  <h3 className="tutor-name">{tutor.name}</h3>
                  <p className="tutor-expertise">{tutor.expertise}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p>No tutors found for your enrolled courses.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyTutors;