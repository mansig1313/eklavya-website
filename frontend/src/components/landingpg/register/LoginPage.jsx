import React, { useState } from "react";
import "./Login.css";
import logo from "../register/logo_white_nobg.png";
import bottomLeftImage from "../register/sign_in.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const axiosInstance = axios.create({
        baseURL: "http://localhost:5000/api",
      });
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        if (role === "Student") {
          navigate("/student-home");
        } else if (role === "Tutor") {
          navigate("/tutor-home");
        } else if (role === "Parent") {
          navigate("/parent-home");
        }
      } else {
        setError(
          response.data.message ||
            "Login failed....Please Check Your Credentials",
        );
     
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="glass-overlay"></div>
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Eklavya Logo" className="logo1" />
          <h1>Login</h1>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Student">Student</option>
            <option value="Parent">Parent</option>
            <option value="Tutor">Tutor</option>
          </select>

          <label>Email</label>
          <input
            type="email"
            placeholder="username@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>

          <button type="submit" className="login-button1">
            Sign in
          </button>

          <p className="or-text">or continue with</p>

          <button type="button1" className="google-signin">
            Sign in with Google
          </button>
        </form>

        <div className="register-section">
          <p>
            Don’t have an account yet?{" "}
            <Link to="/register">Register for Free</Link>
          </p>
        </div>
      </div>
      <img
        src={bottomLeftImage}
        alt="Decorative"
        className="bottom-left-image"
      />
    </div>
  );
}

export default LoginPage;
