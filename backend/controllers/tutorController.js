const Tutor = require('../models/Tutor');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');

// File upload setup using Multer
const upload = multer({ dest: 'uploads/tutor/' });

// Register a Tutor
exports.registerTutor = async (req, res) => {
  try {
    console.log("POST request received at /tregister");
    console.log("Received form data:", req.body);
    console.log("Received files:", req.files);

    const { fullName, email, phone, education, subjects, availableSchedule, experience, teachingMode, bio } = req.body;

    // Validate required files
    if (!req.files || !req.files.degreeCertificate) {
      return res.status(400).json({ error: 'Degree Certificate is required' });
    }

    const degreeCertificate = req.files.degreeCertificate;
    const profilePicture = req.files.profilePicture || null;

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../uploads/tutor/');
    await fs.mkdir(uploadDir, { recursive: true });

    // Save degree certificate
    const degreeCertPath = path.join(uploadDir, `${Date.now()}_${degreeCertificate.name}`);
    await degreeCertificate.mv(degreeCertPath);

    // Save profile picture (if provided)
    let profilePicPath = null;
    if (profilePicture) {
      profilePicPath = path.join(uploadDir, `${Date.now()}_${profilePicture.name}`);
      await profilePicture.mv(profilePicPath);
    }

    // Parse JSON fields
    let parsedEducation, parsedSubjects, parsedSchedule;
    try {
      parsedEducation = JSON.parse(education);
      parsedSubjects = JSON.parse(subjects);
      parsedSchedule = JSON.parse(availableSchedule);
    } catch (err) {
      console.error("Error parsing JSON:", err);
      return res.status(400).json({ error: 'Invalid JSON data provided' });
    }

    // Validate parsedSchedule as an array
    if (!Array.isArray(parsedSchedule)) {
      return res.status(400).json({ error: 'availableSchedule must be an array' });
    }

    // Normalize teachingMode to match enum values
    const normalizedTeachingMode = teachingMode.charAt(0).toUpperCase() + teachingMode.slice(1).toLowerCase();

    // Create new tutor
    const newTutor = new Tutor({
      fullName,
      email,
      phone,
      education: [parsedEducation], // Wrap in an array to match schema
      subjects: parsedSubjects,
      availableSchedule: parsedSchedule,
      experience: parseInt(experience, 10), // Ensure experience is a number
      teachingMode: normalizedTeachingMode,
      bio: bio || '', // Default to empty string if bio is not provided
      profilePicture: profilePicPath,
      degreeCertificate: degreeCertPath,
    });

    await newTutor.save();
    console.log("Tutor saved successfully:", newTutor);

    res.status(201).json({ message: 'Tutor registered successfully', tutor: newTutor });
  } catch (error) {
    console.error("Error registering tutor:", error);

    // Clean up uploaded files on error
    if (req.files?.degreeCertificate) {
      const degreeCertPath = path.join(uploadDir, `${Date.now()}_${req.files.degreeCertificate.name}`);
      try {
        await fs.access(degreeCertPath); // Check if file exists
        await fs.unlink(degreeCertPath); // Delete file
      } catch (err) {
        console.error("Error cleaning up degree certificate:", err);
      }
    }
    if (req.files?.profilePicture) {
      const profilePicPath = path.join(uploadDir, `${Date.now()}_${req.files.profilePicture.name}`);
      try {
        await fs.access(profilePicPath); // Check if file exists
        await fs.unlink(profilePicPath); // Delete file
      } catch (err) {
        console.error("Error cleaning up profile picture:", err);
      }
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};