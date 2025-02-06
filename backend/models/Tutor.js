const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    education: [{
        degree: String,
        institution: String,
        year: Number
    }],
    subjects: {
        type: [String], // Array of subject names
        required: true
    },
    availableSchedule: [{
        day: String,
        timeSlots: [String] // Example: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"]
    }],
    experience: {
        type: Number,
        required: true
    },
    teachingMode: {
        type: String,
        enum: ['Online', 'Offline', 'Both'],
        required: true
    },
    bio: {
        type: String
    },
    profilePicture: {
        type: String, // File path
        default: null
    },
    degreeCertificate: {
        type: String, // File path
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Tutor', TutorSchema);
