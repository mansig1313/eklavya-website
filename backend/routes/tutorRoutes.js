const express = require('express');
const { registerTutor } = require('../controllers/tutorController');
const router = express.Router();

// Tutor Registration Route
router.post('/api/tregister', (req, res, next) => {
    console.log('POST request received at /tregister');
    next();
  }, registerTutor);

module.exports = router;
