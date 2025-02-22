import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./Coursepage.css";

const Coursepage = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const storedUser = localStorage.getItem("registeredUser");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const tutorEmail = parsedUser?.email || "";
  const [formData, setFormData] = useState({
 tutorEmail: tutorEmail, // Use extracted email
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

  // Fetch only courses belonging to the logged-in tutor
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
  
    const form = new FormData();
  
    // Retrieve tutor email from localStorage correctly
    const storedUser = localStorage.getItem("registeredUser");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const tutorEmail = parsedUser?.email || "";
  
    if (!tutorEmail) {
      console.error("Tutor email not found in localStorage!");
      return; // Stop execution if email is missing
    }
  
    // Append form fields
    Object.keys(formData).forEach((key) => {
      if (key === "syllabus" || key === "lectureDays") {
        form.append(key, JSON.stringify(formData[key])); // Convert arrays to JSON strings
      } else if (key === "video") {
        form.append("demoVideo", formData.video); // Use the correct key for the video file
      } else {
        form.append(key, formData[key]);
      }
    });
  
    try {
      await axios.post("http://localhost:5000/courses", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowModal(false);
      fetchCourses();
    } catch (err) {
      console.error("Error creating course:", err.response?.data || err.message);
    }
  };
  

  return (
    <div className="course-page">
      <button className="create-btn" onClick={() => setShowModal(true)}>+ Create Course</button>

      {showModal && (
        <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="modal-content">
            <h2>Create a Course</h2>
            <input type="text" placeholder="Standard" onChange={(e) => setFormData({ ...formData, standard: e.target.value })} />
            <input type="text" placeholder="Subject" onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
            <input type="file" onChange={handleFileChange} />
            <textarea placeholder="Overview" onChange={(e) => setFormData({ ...formData, overview: e.target.value })} />
            <input type="text" placeholder="Lecture Days (comma separated)" onChange={(e) => setFormData({ ...formData, lectureDays: e.target.value.split(",") })} />
            <input type="number" placeholder="Hours Per Day" onChange={(e) => setFormData({ ...formData, hoursPerDay: e.target.value })} />
            <input type="number" placeholder="Price" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </motion.div>
      )}

      <div className="course-list">
        {courses.map((course) => (
          <motion.div key={course._id} className="course-card" whileHover={{ scale: 1.05 }} onClick={() => window.location.href = `/course/${course._id}`}>
            <h3>{course.standard} - {course.subject}</h3>
            <p><strong>Lecture Days:</strong> {course.lectureDays.join(", ")}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Coursepage;
