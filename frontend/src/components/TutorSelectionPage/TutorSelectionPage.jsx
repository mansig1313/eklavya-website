import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBook, FaChalkboardTeacher, FaGraduationCap, FaStar } from "react-icons/fa";
import "./TutorSelectionPage.css";

const TutorSelectionPage = () => {
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/tutors");
        setTutors(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch tutors");
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  const handleTutorClick = async (tutor) => {
    setSelectedTutor(tutor);
    setModalOpen(true);
    try {
      const response = await axios.get(`http://localhost:5000/courses?tutorEmail=${tutor.email}`);
      console.log("📚 Courses fetched:", response.data);
      setCourses(response.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
    }
  };

  const handleEnroll = async (courseId) => {
    console.log("🚀 Attempting to enroll in course:", courseId);
    if (!courseId) {
      console.error("❌ courseId is undefined!");
      return;
    }
    localStorage.setItem("courseToEnroll", courseId);
    window.location.href = "/login";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (tutors.length === 0) return <div>No tutors available.</div>;

  return (
    <div className="tutor-selection-body">
      <h1>ALL TUTORS</h1>
      <p className="tutor-subtitle">Find the best tutors to excel in your studies!</p>

      <div className="tutors-list">
        {tutors.map((tutor, index) => (
          <div key={index} className="tutor-card" onClick={() => handleTutorClick(tutor)}>
            <div className="tutor-image">
              <img src={tutor.profilePicture || "https://via.placeholder.com/120"} alt={tutor.fullName} />
            </div>
            <div className="tutor-info">
              <h3><FaChalkboardTeacher style={{ color: "#1976d2", marginRight: "10px" }} />{tutor.fullName}</h3>
              <p><FaBook style={{ color: "#ff9800", marginRight: "5px" }} /><strong>Subjects:</strong> {tutor.subjects.join(", ")}</p>
              <p><FaGraduationCap style={{ color: "#4caf50", marginRight: "5px" }} /><strong>Education:</strong> {tutor.education.map((edu, idx) => (
                <span key={idx}>{edu.degree} from {edu.institution} ({edu.year})<br /></span>
              ))}</p>
              <p><FaStar style={{ color: "#fbc02d", marginRight: "5px" }} /><strong>Experience:</strong> {tutor.experience} years</p>
              <p><FaChalkboardTeacher style={{ color: "#1976d2", marginRight: "5px" }} /><strong>Teaching Mode:</strong> {tutor.teachingMode}</p>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedTutor && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Courses by {selectedTutor.fullName}</h2>
            {courses.length > 0 ? (
              <div className="courses-list">
                {courses.map((course) => (
                  <div key={course._id} className="course-card">
                    <h3>{course.subject} ({course.standard})</h3>
                    <p><strong>Overview:</strong> {course.overview}</p>
                    <p><strong>Lecture Days:</strong> {course.lectureDays.join(", ")}</p>
                    <p><strong>Hours/Day:</strong> {course.hoursPerDay}</p>
                    <p><strong>Price:</strong> ${course.price}</p>
                    <button className="enroll-button" onClick={() => handleEnroll(course._id)}>Enroll</button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No courses available for this tutor.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorSelectionPage;