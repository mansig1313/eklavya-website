import React, { useState, useEffect } from "react";
import "./tutorprofile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const TutorProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [qualification, setQualification] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null || String);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/tutor-profile");
        const data = response.data;
        setName(data.name || "");
        setEmail(data.email || "");
        setAge(data.age || "");
        setQualification(data.qualification || "");
        setGender(data.gender || "");
        setBio(data.bio || "");
        setProfilePicture(data.profilePicture || null);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile data.");
      }
    };

    fetchProfile();
  }, []);

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      setLoading(true);
      const response = await axios.post("/api/upload-profile-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfilePicture(response.data.url); // Assume backend returns the image URL
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture(null);
  };

  const handleSaveProfile = async () => {
    if (isNaN(age) || age <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    const updatedProfile = {
      name,
      email,
      age,
      qualification,
      gender,
      bio,
      profilePicture,
    };

    try {
      setLoading(true);
      await axios.put("/api/tutor-profile", updatedProfile);
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/change-password", {
        currentPassword,
        newPassword,
      });
      alert("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      {/* Profile Picture Section */}
      <div className="profile-picture-section">
        <label htmlFor="file-input" className="profile-picture-label">
          {profilePicture && typeof profilePicture === "string" ? (
            <img className="profile-picture" src={profilePicture} alt="Profile" />
          ) : (
            <div className="profile-picture-placeholder">
              <FontAwesomeIcon icon={faCamera} className="camera-icon" />
            </div>
          )}
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: "none" }}
        />
        {profilePicture && (
          <button className="remove-picture-btn" onClick={handleRemoveProfilePicture}>
            <FontAwesomeIcon icon={faTrash} /> Remove Picture
          </button>
        )}
      </div>

      {/* Bio Section */}
      <div className="bio-section">
        <label>Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write something about yourself..."
        ></textarea>
      </div>

      {/* Basic Information Section */}
      <div className="profile-section">
        <h3>Basic Information</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />
        <input
          type="text"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          placeholder="Qualification"
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Change Password Section */}
      <div className="profile-section">
        <h3>Change Password</h3>
        {showChangePassword && (
          <form onSubmit={handlePasswordChange}>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Password"}
            </button>
          </form>
        )}
        <button onClick={() => setShowChangePassword(!showChangePassword)}>
          {showChangePassword ? "Cancel" : "Change Password"}
        </button>
      </div>

      {/* Save and Logout */}
      <button onClick={handleSaveProfile} disabled={loading}>
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
};

export default TutorProfile;
