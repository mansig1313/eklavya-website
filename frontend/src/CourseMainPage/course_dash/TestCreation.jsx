import React, { useState } from "react";
import axios from "axios";
import "./CourseDashboard.css";
import { useParams, useNavigate } from "react-router-dom";

const TestCreation = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const tutorEmail = localStorage.getItem("email") || "";

  const [testDetails, setTestDetails] = useState({
    name: "",
    subject: "",
    duration: "",
  });
  const [questions, setQuestions] = useState([]);

  const handleInputChange = (e) => {
    setTestDetails({ ...testDetails, [e.target.name]: e.target.value });
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        image: null,
        text: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const handleQuestionChange = (id, field, value, index = null) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? field === "options"
            ? { ...q, options: q.options.map((opt, i) => (i === index ? value : opt)) }
            : { ...q, [field]: value }
          : q
      )
    );
  };

  const handleImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      setQuestions(
        questions.map((q) => (q.id === id ? { ...q, image: file } : q))
      );
    }
  };

  const handleSubmit = async () => {
    if (!tutorEmail) {
      alert("Please log in to create a test.");
      return;
    }

    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("tutorEmail", tutorEmail);
    formData.append("name", testDetails.name);
    formData.append("subject", testDetails.subject);
    formData.append("duration", testDetails.duration);
    formData.append("questions", JSON.stringify(questions.map((q) => ({
      text: q.text,
      options: q.options,
      correctAnswer: q.correctAnswer,
    }))));

    // Append images
    questions.forEach((q, i) => {
      if (q.image instanceof File) {
        formData.append("images", q.image); // Matches backend upload.array("images")
      }
    });

    try {
      await axios.post("http://localhost:5000/api/tests", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Test created successfully!");
      navigate(`/course-dashboard/${courseId}`);
    } catch (err) {
      console.error("Error creating test:", err.response?.data || err.message);
      alert("Failed to create test: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="test-creation">
      <h1>Create a New Test</h1>
      <div className="test-form">
        <input
          type="text"
          name="name"
          placeholder="Test Name"
          value={testDetails.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={testDetails.subject}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 1 hr)"
          value={testDetails.duration}
          onChange={handleInputChange}
        />
      </div>

      <h2>Questions</h2>
      {questions.map((q) => (
        <div key={q.id} className="question-block">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(q.id, e)}
          />
          <textarea
            placeholder="Question Text"
            value={q.text}
            onChange={(e) => handleQuestionChange(q.id, "text", e.target.value)}
          />
          {q.options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleQuestionChange(q.id, "options", e.target.value, i)}
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) => handleQuestionChange(q.id, "correctAnswer", e.target.value)}
          />
        </div>
      ))}
      <button className="btn-add" onClick={addQuestion}>
        Add Question
      </button>
      <button className="btn-submit" onClick={handleSubmit}>
        Create Test
      </button>
    </div>
  );
};

export default TestCreation;