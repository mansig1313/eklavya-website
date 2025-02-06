const Tutor = require('../models/Tutor');
const path = require('path');
const fs = require('fs');

// File upload setup using Multer
const multer = require('multer');
const upload = multer({ dest: 'uploads/tutor/' });

// Register a Tutor
exports.registerTutor = async (req, res) => {
    try {
        const { fullName, email, phone, education, subjects, availableSchedule, experience, teachingMode, bio } = req.body;

        // Check if required files are uploaded
        if (!req.files || !req.files.degreeCertificate) {
            return res.status(400).json({ error: 'Degree Certificate is required' });
        }

        const degreeCertificate = req.files.degreeCertificate;
        const profilePicture = req.files.profilePicture || null;

        // Save files to server
        const uploadDir = path.join(__dirname, '../uploads/tutor/');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        const degreeCertPath = uploadDir + Date.now() + '_' + degreeCertificate.name;
        await degreeCertificate.mv(degreeCertPath);

        let profilePicPath = null;
        if (profilePicture) {
            profilePicPath = uploadDir + Date.now() + '_' + profilePicture.name;
            await profilePicture.mv(profilePicPath);
        }

        // Create new tutor
        const newTutor = new Tutor({
            fullName,
            email,
            phone,
            education: JSON.parse(education),
            subjects: JSON.parse(subjects),
            availableSchedule: JSON.parse(availableSchedule),
            experience,
            teachingMode,
            bio,
            profilePicture: profilePicPath,
            degreeCertificate: degreeCertPath,
        });

        await newTutor.save();
        res.status(201).json({ message: 'Tutor registered successfully', tutor: newTutor });

    } catch (error) {
        console.error('Error registering tutor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
