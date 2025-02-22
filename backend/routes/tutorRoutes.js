const express = require('express');
const { registerTutor } = require('../controllers/tutorController');
const fileUpload = require('express-fileupload');
const router = express.Router();
const Tutor = require('../models/Tutor');

// Apply fileUpload middleware to the tutor registration route
router.post('/api/tregister', fileUpload(), (req, res, next) => {
  console.log('POST request received at /tregister');
  next();
}, registerTutor);

router.get('/api/tutors', async (req, res) => {
  try {
    // Fetch all tutors from the database
    const tutors = await Tutor.find({});

    if (!tutors || tutors.length === 0) {
      return res.status(404).json({ error: 'No tutors found' });
    }

    res.status(200).json(tutors);
  } catch (error) {
    console.error('Error fetching tutors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;