import React from 'react';
import { Link } from 'react-router-dom';
import '../StudentMyCoursepg/StudentMyCoursepg.css'; // Assuming you'll style it using this CSS file

const MyCourse = ({ studentName, courses }) => {
  // Check if 'courses' is an array and has elements
  const isCoursesValid = Array.isArray(courses) && courses.length > 0;

  return (
    <div className="MyCourse-page-body">
      {/* Header Section */}
      <header className="course-header">
        <h1>
          <i className="fas fa-user-graduate"></i> Hello, {studentName}! Welcome to your Learning Hub!
        </h1>
        <p>Your personalized journey to knowledge and growth begins here.</p>
      </header>

      {/* Course Overview Section */}
      <section className="course-overview">
        <h2>
          <i className="fas fa-book-open"></i> Course Overview
        </h2>
        {isCoursesValid ? (
          courses.map((course, index) => (
            <div key={index} className="course-item">
              <div className="course-image">
                <img
                  src={course.image || 'https://via.placeholder.com/150'} // Placeholder image if course image is missing
                  alt={course.name}
                />
              </div>
              <div className="course-info">
                <h3>
                  <i className="fas fa-chalkboard-teacher"></i> {course.name}
                </h3>
                <p>{course.description}</p>
                <p>
                  <strong>Tutor: </strong> {course.tutor}
                </p>
                <p>
                  <strong>Duration: </strong> {course.duration}
                </p>
                <p>
                  <strong>Schedule: </strong> {course.schedule}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No courses available at the moment.</p> // Handle empty or undefined courses
        )}
      </section>

      {/* Enrolled Courses Section */}
      <section className="enrolled-courses">
        <h2>
          <i className="fas fa-list-ul"></i> Enrolled Courses
        </h2>
        {isCoursesValid ? (
          <ul>
            {courses.map((course, index) => (
              <li key={index}>
                <p>
                  <i className="fas fa-check-circle"></i> {course.name} -{' '}
                  <strong>{course.status}</strong>
                </p>
                <Link to={`/course/${course.id}`} className="course-details-link">
                  <i className="fas fa-info-circle"></i> View Details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No enrolled courses found.</p> // Handle empty or undefined courses
        )}
      </section>
    </div>
  );
};

export default MyCourse;
