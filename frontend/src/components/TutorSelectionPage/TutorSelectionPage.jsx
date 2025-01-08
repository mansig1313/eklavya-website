import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaBook, FaChalkboardTeacher, FaGraduationCap, FaStar } from "react-icons/fa";
import "./TutorSelectionPage.css";

const tutorsData = {
  Science: [
    {
      name: "Dr. John Smith",
      subject: "Physics",
      qualification: "PhD in Physics",
      specialization: "Quantum Mechanics",
      experience: "10 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Ms. Jane Doe",
      subject: "Chemistry",
      qualification: "MSc in Chemistry",
      specialization: "Organic Chemistry",
      experience: "8 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Mr. Alex Johnson",
      subject: "Mathematics",
      qualification: "MSc in Mathematics",
      specialization: "Calculus",
      experience: "12 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Dr. Emily Davis",
      subject: "Biology",
      qualification: "PhD in Biology",
      specialization: "Microbiology",
      experience: "7 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Ms. Sarah White",
      subject: "English",
      qualification: "MA in English Literature",
      specialization: "Creative Writing",
      experience: "5 years",
      image: "https://via.placeholder.com/120",
    },
  ],
  Commerce: [
    {
      name: "Mr. Richard Lee",
      subject: "Accountancy",
      qualification: "MBA in Finance",
      specialization: "Accounting Principles",
      experience: "15 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Ms. Rachel Green",
      subject: "Business Studies",
      qualification: "MBA in Marketing",
      specialization: "Marketing Strategies",
      experience: "10 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Mr. Samuel Roberts",
      subject: "Economics",
      qualification: "MSc in Economics",
      specialization: "Macroeconomics",
      experience: "12 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Ms. Emma Johnson",
      subject: "English",
      qualification: "MA in English Literature",
      specialization: "Creative Writing",
      experience: "7 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Mr. James Hall",
      subject: "Informatics Practices",
      qualification: "BSc in Information Technology",
      specialization: "Data Structures and Algorithms",
      experience: "8 years",
      image: "https://via.placeholder.com/120",
    },
  ],
  Arts: [
    {
      name: "Dr. Anna Wilson",
      subject: "History",
      qualification: "PhD in History",
      specialization: "Ancient Civilizations",
      experience: "20 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Mr. Peter Clarke",
      subject: "Sociology",
      qualification: "MA in Sociology",
      specialization: "Social Stratification",
      experience: "15 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Ms. Clara Brown",
      subject: "Economics",
      qualification: "MSc in Economics",
      specialization: "Microeconomics",
      experience: "10 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Dr. Linda Green",
      subject: "Geography",
      qualification: "PhD in Geography",
      specialization: "Urban Geography",
      experience: "18 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Mr. James Walker",
      subject: "Psychology",
      qualification: "MA in Psychology",
      specialization: "Clinical Psychology",
      experience: "12 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Ms. Maria Evans",
      subject: "Hindi",
      qualification: "MA in Hindi Literature",
      specialization: "Poetry and Prose",
      experience: "8 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Mr. Richard Moore",
      subject: "English",
      qualification: "MA in English Literature",
      specialization: "Literary Criticism",
      experience: "6 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Dr. Eleanor White",
      subject: "Philosophy",
      qualification: "PhD in Philosophy",
      specialization: "Ethics",
      experience: "14 years",
      image: "https://via.placeholder.com/120",
    },
    {
      name: "Mr. David Harris",
      subject: "Political Science",
      qualification: "MA in Political Science",
      specialization: "International Relations",
      experience: "10 years",
      image: "https://via.placeholder.com/120",
    },
  ],
};

const TutorSelectionPage = () => {
  const { stream } = useParams();
  const normalizedStream = stream.charAt(0).toUpperCase() + stream.slice(1).toLowerCase();
  const [selectedSubject, setSelectedSubject] = useState("");
  const tutors = tutorsData[normalizedStream] || [];

  const handleFilterChange = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
  };

  const filteredTutors = selectedSubject
    ? tutors.filter((tutor) => tutor.subject === selectedSubject)
    : tutors;

  if (tutors.length === 0) {
    return <div>No tutors available for this stream.</div>;
  }

  return (
    <div className="tutor-selection-body">
      {/* Dynamic Heading */}
      <h1>{normalizedStream.toUpperCase()} TUTORS</h1>
      <p className="tutor-subtitle">
        Find the best tutors for {normalizedStream} subjects to excel in your studies!
      </p>

      <div className="filter-bar">
        <label htmlFor="subject-filter">SELECT A SUBJECT :</label>
        <select id="subject-filter" onChange={handleFilterChange}>
          <option value="">All Subjects</option>
          {/* Dynamically generate the subject options based on the stream */}
          {tutors.map((tutor, index) => (
            <option key={index} value={tutor.subject}>
              {tutor.subject}
            </option>
          ))}
        </select>
      </div>

      <div className="tutors-list">
        {filteredTutors.map((tutor, index) => (
          <div key={index} className="tutor-card">
            <div className="tutor-image">
              <img src={tutor.image} alt={`${tutor.name}'s profile`} />
            </div>
            <div className="tutor-info">
              <h3>
                <FaChalkboardTeacher style={{ color: "#1976d2", marginRight: "10px" }} />
                {tutor.name}
              </h3>
              <p>
                <FaBook style={{ color: "#ff9800", marginRight: "5px" }} />
                <strong>Subject:</strong> {tutor.subject}
              </p>
              <p>
                <FaGraduationCap style={{ color: "#4caf50", marginRight: "5px" }} />
                <strong>Qualification:</strong> {tutor.qualification}
              </p>
              <p>
                <FaStar style={{ color: "#fbc02d", marginRight: "5px" }} />
                <strong>Specialization:</strong> {tutor.specialization}
              </p>
              <p>
                <FaChalkboardTeacher style={{ color: "#1976d2", marginRight: "5px" }} />
                <strong>Experience:</strong> {tutor.experience}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorSelectionPage;
