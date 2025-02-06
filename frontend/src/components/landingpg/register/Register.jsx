import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Register.css';
import logo from '../register/logo_black_nobg.png';
import backgroundImage from '../register/loginimg-removebg-preview.png';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(''); // State to hold error messages

    const navigate = useNavigate();

    const handleRegister = async (e) => {
      e.preventDefault();
      setError("");
  
      if (!name || !email || !password || !role) {
        setError("All fields are required");
        return;
      }
  
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
  
      try {
        const response = await axios.post("http://localhost:5000/api/auth/register", {
          name,
          email,
          password,
          role,
        });
  
        if (response.status === 201) {
          if (role === "tutor") {
            // Store registration data
            const userData = { name, email };
            console.log('Storing user data:', userData);
            localStorage.setItem('registeredUser', JSON.stringify(userData));
            navigate('/tutor-register', { state: userData });
          } else {
            alert("Registration successful!");
            navigate("/login");
          }
        } else {
          setError(response.data.message || "Registration failed. Please try again.");
        }
      } catch (error) {
        setError(error.response?.data?.message || "Registration failed");
      }
  };

  return (
    <div className="register-page-container">
      <div className="register-page">
        <div className="register-form">
          <img src={logo} alt="Eklavya Logo" className="register-logo" />
          <h2>Register</h2>
          {error && <p className="error-message">{error}</p>} {/* Display error messages */}
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="tutor">Tutor</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              required
            />
            <button type="submit" className="register-button">Register</button>
          </form>
          <div className="login-text">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="login-link">
              Sign in
            </button>
          </div>
        </div>
        <div
          className="register-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      </div>
    </div>
  );
};

export default Register;
