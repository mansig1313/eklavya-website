import React, { useState, useEffect } from "react";
import "./studentprofile.css";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  const [profilePicture, setProfilePicture] = useState(
    "http://default-image-url.com/default.jpg"
  );
  const [profileVisibility, setProfileVisibility] = useState(true);

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/profile/${email}`);
        const profile = response.data;
        setName(profile.name);
        setParentEmail(profile.parentEmail);
        setLinkedin(profile.linkedin);
        setGithub(profile.github);
        setTwitter(profile.twitter);
        setWebsite(profile.website);
        setProfilePicture(profile.profilePicture);
        setProfileVisibility(profile.profileVisibility);
        setProfilePicture(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    
    if (email) {
      fetchProfile();
    }
  }, [email]);

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
  
    // Check if a file is selected
    if (!file) {
      alert("No file selected. Please choose an image.");
      return;
    }
  
    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Invalid file type. Please upload an image.");
      return;
    }
  
    // Validate file size (example: max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      alert("File size exceeds 2MB. Please upload a smaller image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("profilePicture", file);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:5000/upload-profile-picture",
        formData,
        { headers: { "Content-Type": "multipart/form-data" ,
          "Authorization": `Bearer ${token}`
        } }
      );
  
      if (response.data && response.data.imageUrl) {
        setProfilePicture(response.data.imageUrl);
        alert("Profile picture uploaded successfully!");
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture. Please try again.");
    }
  };
  

  const handleProfileUpdate = async () => {
    if (!parentEmail) {
      alert("Parent's email is required. Please fill it out.");
      return;
    }

    try {
      const profileData = {
        name,
        email,
        parentEmail,
        linkedin,
        github,
        twitter,
        website,
        profilePicture,
        profileVisibility,
      };
      await axios.post("http://localhost:5000/profile", profileData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/change-password", {
        email,
        currentPassword,
        newPassword,
      });
      if (response.status === 200) {
        alert("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowChangePassword(false);
      } else {
        throw new Error("Password change failed");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please check your current password and try again.");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    setPasswordsMatch(confirmPasswordValue === newPassword);
  };

  const handleLogout = () => {
    alert("You have been logged out.");
  };

  return (
    <div className="profile-page">
    <div className="studentprofile">
    <div className="studentprofile-container">
      <div className="profile-picture-section">
        <div className="profile-picture-wrapper">
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            style={{ display: "none" }}
          />
          <label htmlFor="file-input" className="profile-picture-label">
            {profilePicture !== "http://default-image-url.com/default.jpg" ? (
              <img className="profile-picture" src={profilePicture} alt="Profile" />
            ) : (
              <div className="profile-picture-placeholder">
                <span>Profile Picture</span>
              </div>
            )}
          </label>
        </div>
        {profilePicture !== "http://default-image-url.com/default.jpg" && (
          <button
            className="remove-picture-btn"
            onClick={() =>
              setProfilePicture("http://default-image-url.com/default.jpg")
            }
          >
            Remove Picture
          </button>
        )}
      </div>

      <div className="profile-section">
        <h3>Basic Information</h3>
        <div className="profile-field">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Parent's Email (Required):</label>
          <input
            type="email"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="profile-section">
        <h3>Social Links</h3>
        <div className="profile-field">
          <label>LinkedIn:</label>
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>GitHub:</label>
          <input
            type="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Twitter:</label>
          <input
            type="url"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Website:</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      </div>

      <div className="profile-section">
        <h3>Privacy Settings</h3>
        <div className="profile-field">
          <label>Profile Visibility:</label>
          <select
            value={profileVisibility ? "public" : "private"}
            onChange={(e) => setProfileVisibility(e.target.value === "public")}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="profile-field">
          <button
            className="toggle-password-btn"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            {showChangePassword ? "Hide Change Password" : "Change Password"}
          </button>
        </div>
        {showChangePassword && (
          <form onSubmit={handlePasswordChange} className="password-form">
            <div className="profile-field">
              <label>Current Password:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="profile-field">
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="profile-field">
              <label>Confirm New Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {!passwordsMatch && confirmPassword && (
                <span className="error-message">
                  Confirm password does not match the new password
                </span>
              )}
            </div>
            {passwordsMatch && confirmPassword && (
              <button type="submit">Save Password</button>
            )}
          </form>
        )}

        <button onClick={handleProfileUpdate}>Save Profile</button>
      </div>

      <div className="profile-field">
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Profile;
