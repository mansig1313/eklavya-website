import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./Coursepage.css";

const Coursepage = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const tutorEmail = localStorage.getItem("email") || "";

  const [formData, setFormData] = useState({
    tutorEmail,
    standard: "",
    subject: "",
    video: null,
    overview: "",
    syllabus: [],
    lectureDays: [],
    hoursPerDay: "",
    price: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    if (!tutorEmail) return;
    try {
      const { data } = await axios.get(`http://localhost:5000/courses?tutorEmail=${tutorEmail}`);
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err.message);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tutorEmail) {
      alert("Please log in to create a course.");
      return;
    }

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "syllabus" || key === "lectureDays") {
        form.append(key, JSON.stringify(formData[key]));
      } else if (key === "video") {
        form.append("demoVideo", formData.video);
      } else {
        form.append(key, formData[key]);
      }
    });

    try {
      await axios.post("http://localhost:5000/courses", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowModal(false);
      setFormData({ ...formData, standard: "", subject: "", video: null, overview: "", syllabus: [], lectureDays: [], hoursPerDay: "", price: "" });
      fetchCourses();
    } catch (err) {
      console.error("Error creating course:", err.response?.data || err.message);
      alert("Failed to create course.");
    }
  };

  return (
    <div className="course-page">
      <button className="create-btn" onClick={() => setShowModal(true)}>
        + Create Course
      </button>

      {showModal && (
        <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="modal-content">
            <h2>Create a Course</h2>
            <input
              type="text"
              placeholder="Standard"
              value={formData.standard}
              onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
            />
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
            <input type="file" onChange={handleFileChange} />
            <textarea
              placeholder="Overview"
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
            />
            <input
              type="text"
              placeholder="Lecture Days (comma separated)"
              value={formData.lectureDays.join(",")}
              onChange={(e) => setFormData({ ...formData, lectureDays: e.target.value.split(",") })}
            />
            <input
              type="number"
              placeholder="Hours Per Day"
              value={formData.hoursPerDay}
              onChange={(e) => setFormData({ ...formData, hoursPerDay: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </motion.div>
      )}

      <div className="course-list">
        {courses.map((course) => (
          <motion.div
            key={course._id}
            className="course-card"
            whileHover={{ scale: 1.05 }}
            onClick={() => (window.location.href = `/course-dashboard/${course._id}`)}
          >
            <h3>{course.standard} - {course.subject}</h3>
            <p><strong>Lecture Days:</strong> {course.lectureDays.join(", ")}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Coursepage;