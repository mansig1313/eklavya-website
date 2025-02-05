import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tutorregister from "../register/tutorregister.png";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import "./tutorregister.css"; // Importing the CSS file

const subjectsList = ["Mathematics", "Physics", "Chemistry", "Biology", "English"];
const teachingModes = ["Online", "Offline", "Both"];
const availableDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TutorRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "",
    degree: "",
    institution: "",
    graduationYear: "",
    subjects: [],
    schedule: [],
    experience: "",
    teachingMode: "",
    bio: "",
    profilePic: null,
    degreeCertificate: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelectChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    navigate("/tutor-dashboard"); // Redirect after registration
  };

  return (
    <Grid container className="tutor-register-page">
      {/* Title at the Top */}
      <Grid item xs={12}>
        <Typography variant="h3" className="register-title">
          Complete Your Registration
        </Typography>
      </Grid>

      <Grid item xs={12} container className="register-content">
        {/* Left Side: Registration Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="tutor-register-paper">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Full Name & Email */}
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" name="email" value={formData.email} disabled />
                </Grid>

                {/* Phone Number */}
                <Grid item xs={12}>
                  <TextField fullWidth label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </Grid>

                {/* Education Details */}
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Degree" name="degree" value={formData.degree} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Institution" name="institution" value={formData.institution} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Graduation Year" name="graduationYear" type="number" value={formData.graduationYear} onChange={handleChange} required />
                </Grid>

                {/* Subjects to Teach */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Subjects</InputLabel>
                    <Select name="subjects" multiple value={formData.subjects} onChange={handleMultiSelectChange}>
                      {subjectsList.map((subject) => (
                        <MenuItem key={subject} value={subject}>
                          {subject}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Available Schedule */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Available Days</InputLabel>
                    <Select name="schedule" multiple value={formData.schedule} onChange={handleMultiSelectChange}>
                      {availableDays.map((day) => (
                        <MenuItem key={day} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Experience */}
                <Grid item xs={12}>
                  <TextField fullWidth label="Years of Experience" name="experience" type="number" value={formData.experience} onChange={handleChange} required />
                </Grid>

                {/* Teaching Mode */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Teaching Mode</InputLabel>
                    <Select name="teachingMode" value={formData.teachingMode} onChange={handleChange}>
                      {teachingModes.map((mode) => (
                        <MenuItem key={mode} value={mode}>
                          {mode}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Bio */}
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={3} label="Bio / Introduction" name="bio" value={formData.bio} onChange={handleChange} />
                </Grid>

                {/* Profile Picture Upload */}
                <Grid item xs={12} className="profile-upload-container">
                  <Avatar className="profile-avatar" src={formData.profilePic ? URL.createObjectURL(formData.profilePic) : ""} />
                  <Button variant="contained" component="label">
                    Upload Profile Picture
                    <input type="file" hidden accept="image/*" name="profilePic" onChange={handleFileChange} />
                  </Button>
                </Grid>

                {/* Graduation Degree Certificate Upload */}
                <Grid item xs={12} className="certificate-upload-container">
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

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth className="register-button">
                    Register as Tutor
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Right Side: Image */}
        <Grid item xs={12} md={6} className="register-image-container">
          <img src= {tutorregister} alt="Tutoring" className="tutor-register-image" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TutorRegister;
