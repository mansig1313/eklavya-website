import React from "react";
import { Link } from "react-router-dom";
import "./CoursePage.css"; // Ensure the CSS file exists
import { FaFlask, FaPalette, FaBriefcase } from "react-icons/fa";

const CoursePage = () => {
  return (
    <div className="course-page-body">
      {/* Welcome Section */}
      <div className="course-page-course-header">
        <h1>Welcome to Eklavya - Online Tutoring Platform</h1>
        <p>Explore the courses offered by our platform</p>
      </div>

      {/* Courses Section */}
      <div className="course-page-course-containers">
        {/* Science Course */}
        <Link to="/science" className="course-link">
          <div className="course-page-course-container course-page-science">
            <div className="course-page-course-icon">
              <FaFlask />
            </div>
            <h2>Science</h2>
            <p>Discover the mysteries of Physics, Chemistry, and Biology.</p>
          </div>
        </Link>

        {/* Arts Course */}
        <Link to="/arts" className="course-link">
          <div className="course-page-course-container course-page-arts">
            <div className="course-page-course-icon">
              <FaPalette />
            </div>
            <h2>Arts</h2>
            <p>Discover the beauty of Literature, History, and Arts.</p>
          </div>
        </Link>

        {/* Commerce Course */}
        <Link to="/commerce" className="course-link">
          <div className="course-page-course-container course-page-commerce">
            <div className="course-page-course-icon">
              <FaBriefcase />
            </div>
            <h2>Commerce</h2>
            <p>Learn Business Studies, Accountancy, and Economics.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CoursePage;
