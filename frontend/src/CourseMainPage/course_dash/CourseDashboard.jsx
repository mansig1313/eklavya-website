import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CourseDashboard.css";
import { useNavigate, useParams } from "react-router-dom";

const CourseDashboard = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const tutorEmail = localStorage.getItem("email") || "";

  const [tests, setTests] = useState([]);
  const [resources, setResources] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    if (!tutorEmail) {
      alert("Please log in to view this page.");
      return;
    }
    try {
      const courseResponse = await axios.get(`http://localhost:5000/courses/${courseId}`);
      const course = courseResponse.data;
      if (course.tutorEmail !== tutorEmail) throw new Error("Unauthorized access");

      const testsResponse = await axios.get(`http://localhost:5000/api/courses/${courseId}/tests`);
      setTests(testsResponse.data || []);

      setResources(course.resources || []);

      // Log to debug
      console.log("Students from backend:", course.studentsEnrolled);
      setStudents(
        course.studentsEnrolled.map((student) => ({
          id: student._id,
          name: student.name || "Unknown",
          email: student.email || "N/A",
        })) || []
      );
    } catch (err) {
      console.error("Error fetching course data:", err.message);
      alert("Failed to load course data: " + err.message);
    }
  };

  const handleAddResource = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resource", file);
    formData.append("tutorEmail", tutorEmail);

    try {
      await axios.post(`http://localhost:5000/api/courses/${courseId}/resources`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchCourseData();
    } catch (err) {
      console.error("Error uploading resource:", err.message);
      alert("Failed to upload resource: " + err.message);
    }
  };

  const handleDeleteResource = async (resourceUrl) => {
    try {
      setResources(resources.filter((res) => res !== resourceUrl));
    } catch (err) {
      console.error("Error deleting resource:", err.message);
    }
  };

  const handleUpdateResourceName = async (oldUrl, newName) => {
    try {
      setResources(resources.map((res) => (res === oldUrl ? oldUrl.replace(/[^/]+$/, newName) : res)));
    } catch (err) {
      console.error("Error updating resource:", err.message);
    }
  };

  return (
    <div className="course-dashboard">
      <h1>Course Dashboard</h1>
      <div className="dashboard-grid">
        <div className="card test-card">
          <div className="card-header">
            <h2>Tests</h2>
            <button className="btn-create" onClick={() => navigate(`/create-test/${courseId}`)}>
              Create Test
            </button>
          </div>
          <div className="card-content">
            {tests.length === 0 ? (
              <p>No tests created yet.</p>
            ) : (
              tests.map((test) => (
                <div key={test._id} className="item">
                  <span>{test.name}</span>
                  <span>{test.subject} - {test.duration}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card resource-card">
          <h2>Resources</h2>
          <div className="card-content">
            <input
              type="file"
              accept=".pdf"
              onChange={handleAddResource}
              className="file-input"
              id="resource-upload"
            />
            <label htmlFor="resource-upload" className="btn-upload">
              Upload PDF
            </label>
            {resources.map((res, i) => (
              <div key={i} className="item resource-item">
                <a href={res} target="_blank" rel="noopener noreferrer">
                  {res.split("/").pop()}
                </a>
                <div className="item-actions">
                  <button
                    onClick={() => handleUpdateResourceName(res, prompt("New name:", res.split("/").pop()))}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteResource(res)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card students-card">
          <h2>Enrolled Students</h2>
          <div className="card-content">
            {students.length === 0 ? (
              <p>No students enrolled yet.</p>
            ) : (
              students.map((student) => (
                <div key={student.id} className="item">
                  <span>{student.name}</span>
                  <span>{student.email}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;