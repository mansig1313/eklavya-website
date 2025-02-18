import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TestEditor.css";
import { FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";

const TestEditor = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const formattedTestId = String(testId); 

  console.log("Current testId:", testId);

  useEffect(() => {
    if (!testId) {
      console.error("Test ID is undefined! Cannot fetch test.");
      return;
    }

    fetch(`http://localhost:5000/api/tests/${Number(testId)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Test not found");
        }
        return res.json();
      })
      .then((data) => {
        if (!data || !data.questions) {
          console.error("Invalid test data received:", data);
          return;
        }
        setTitle(data.title || "Untitled Test");
        setQuestions(data.questions);
      })
      .catch((err) => console.error("Error fetching test:", err));
  }, [testId]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", image: "", options: ["", "", "", ""], correct: "" }]);
  };

  const handleSave = async () => {

    if (!formattedTestId) {
    console.error("Error: testId is missing.");
    alert("Error: Test ID is missing.");
    return;
  }

    if (!testId || testId === "undefined") {
      console.error("Error: testId is undefined.");
      alert("Error: Test ID is missing. Cannot update test.");
      return;
    }

    const payload = { title, questions };

    console.log("Sending update request for testId:", testId);
    console.log("Payload:", payload);

    try {
      const response = await fetch(`http://localhost:5000/api/tests/update/${testId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Update Response:", result);

      if (response.ok) {
        alert("Test updated successfully!");
        navigate("/tl");
      } else {
        alert("Failed to update test. Server response: " + result.error);
      }
    } catch (err) {
      console.error("Error updating test:", err);
      alert("An error occurred while updating the test.");
    }
  };

  const handleTextChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
    setQuestions(newQuestions);
  };

  const handleImageUpload = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].image = URL.createObjectURL(event.target.files[0]);
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswer = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correct = value;
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const moveQuestion = (index, direction) => {
    const newQuestions = [...questions];
    const [moved] = newQuestions.splice(index, 1);
    newQuestions.splice(index + direction, 0, moved);
    setQuestions(newQuestions);
  };

  return (
    <div className="editor-container">
      <h2>Editing Test: {testId}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter test title..."
      />

      <button className="add-btn" onClick={addQuestion}>+ Add Question</button>

      {questions.map((q, index) => (
        <div className="question-box" key={index}>
          <textarea
            value={q.text}
            onChange={(e) => handleTextChange(index, e.target.value)}
            placeholder="Enter question text..."
          />
          <input type="file" onChange={(e) => handleImageUpload(index, e)} />
          {q.image && <img src={q.image} alt="Question" className="question-img" />}

          <div className="options-container">
            {q.options.map((opt, optIndex) => (
              <input
                key={optIndex}
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                placeholder={`Option ${optIndex + 1}`}
              />
            ))}
          </div>

          <select value={q.correct} onChange={(e) => handleCorrectAnswer(index, e.target.value)}>
            <option value="">Select Correct Answer</option>
            {q.options.map((opt, optIndex) => (
              <option key={optIndex} value={opt}>{opt}</option>
            ))}
          </select>

          <div className="question-actions">
            <button onClick={() => moveQuestion(index, -1)} disabled={index === 0}>
              <FaArrowUp />
            </button>
            <button onClick={() => moveQuestion(index, 1)} disabled={index === questions.length - 1}>
              <FaArrowDown />
            </button>
            <button onClick={() => removeQuestion(index)}><FaTrash /></button>
          </div>
        </div>
      ))}

      <button className="save-btn" onClick={handleSave}>Save Test</button>
      <button className="cancel-btn" onClick={() => navigate("/tl")}>Cancel</button>
    </div>
  );
};

export default TestEditor;
