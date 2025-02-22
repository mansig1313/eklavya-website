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
        degree: {
            type: String,
            required: true
        },
        institution: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    }],
    subjects: {
        type: [String], // Array of subject names
        required: true
    },
    availableSchedule: {
        type: [String], // Simplified to an array of day names (e.g., ["mon", "wed"])
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    teachingMode: {
        type: String,
        enum: ['Online', 'Offline', 'Both'], // Case-sensitive values
        required: true
    },
    bio: {
        type: String,
        default: '' // Default empty string if not provided
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