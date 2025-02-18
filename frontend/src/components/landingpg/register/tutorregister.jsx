import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import tutorregister from "../register/ttrr.png"; // Image for the right side of the page
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import "./Tutorregister.css"; // Importing the CSS file

const TutorRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    degree: "",
    institution: "",
    graduationYear: "",
    subjects: "",
    schedule: "",
    experience: "",
    teachingMode: "",
    bio: "",
    profilePic: null,
    degreeCertificate: null,
  });

  useEffect(() => {
    const registeredUser = location.state || JSON.parse(localStorage.getItem("registeredUser"));
    if (registeredUser && (registeredUser.name || registeredUser.email)) {
      setFormData((prev) => ({
        ...prev,
        fullName: registeredUser.name || "",
        email: registeredUser.email || "",
      }));
    } else {
      setError("Please register first");
      setTimeout(() => navigate("/tutorregister"), 2000);
    }
    setLoading(false);
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axios.post("http://localhost:5000/api/tregister", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/tutor-home");
    } catch (error) {
      setError(error.response?.data?.message || "Error submitting form");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });
  };

  return (
    <Grid container className="tutor-register-page">
      {/* Title at the Top */}
      <Grid item xs={12}>
        <Typography variant="h3" className="register-title">
          Complete Your Registration !!!
        </Typography>
      </Grid>

      <Grid item xs={12} container className="tutor-register-content">
        {/* Left Side: Registration Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="tutor-register-paper">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" name="email" value={formData.email} disabled />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Degree" name="degree" value={formData.degree} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Institution" name="institution" value={formData.institution} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Graduation Year" name="graduationYear" type="number" value={formData.graduationYear} onChange={handleChange} required />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Subjects" name="subjects" value={formData.subjects} onChange={handleChange} placeholder="Enter subjects (comma separated)" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Available Days" name="schedule" value={formData.schedule} onChange={handleChange} placeholder="Enter days (comma separated)" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Years of Experience" name="experience" type="number" value={formData.experience} onChange={handleChange} required />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Teaching Mode" name="teachingMode" value={formData.teachingMode} onChange={handleChange} placeholder="Enter Teaching Mode (Online/Offline/Both)" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={3} label="Bio / Introduction" name="bio" value={formData.bio} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                  <Avatar className="profile-avatar" src={formData.profilePic ? URL.createObjectURL(formData.profilePic) : ""} />
                  <Button variant="contained" component="label">
                    Upload Profile Picture
                    <input type="file" hidden accept="image/*" name="profilePic" onChange={handleFileChange} />
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" component="label">
                    Upload Graduation Degree Certificate
                    <input type="file" hidden accept="application/pdf, image/*" name="degreeCertificate" onChange={handleFileChange} />
                  </Button>
                  {formData.degreeCertificate && (
                    <Typography variant="body2" className="file-name">
                      {formData.degreeCertificate.name}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth className="tutor-register-button">
                    Register as Tutor
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Right Side: Image */}
        <Grid item xs={12} md={6} className="tutor-register-image-container">
          <img src={tutorregister} alt="Tutoring" className="tutor-register-image" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TutorRegister;
