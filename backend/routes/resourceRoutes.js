const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const Resource = require('../models/Resource'); // Import the Resource model
const router = express.Router();

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/resources/' });

// Serve uploaded files
router.use('/uploads/resources', express.static(path.join(__dirname, '../uploads/resources')));

// Upload a resource
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { email, subject, description } = req.body;
    const file = req.file;

    if (!file || !email || !subject) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate a unique file name
    const uniqueFileName = `${Date.now()}_${file.originalname}`;
    const filePath = path.join(__dirname, '../uploads/resources', uniqueFileName);

    // Move the file to the permanent location
    await fs.rename(file.path, filePath);

    // Save resource metadata to the database
    const newResource = new Resource({
      email,
      subject,
      fileName: file.originalname,
      description,
      filePath: `/uploads/resources/${uniqueFileName}`,
    });

    await newResource.save();
    res.status(201).json({ message: 'Resource uploaded successfully', resource: newResource });
  } catch (error) {
    console.error('Error uploading resource:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rename a resource
router.put('/rename/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { newFileName } = req.body;

    if (!newFileName) {
      return res.status(400).json({ error: 'New file name is required' });
    }

    // Find the resource by ID
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // Rename the file on the server
    const oldFilePath = path.join(__dirname, '..', resource.filePath);
    const newFilePath = path.join(__dirname, '../uploads/resources', `${Date.now()}_${newFileName}`);
    await fs.rename(oldFilePath, newFilePath);

    // Update the resource metadata
    resource.fileName = newFileName;
    resource.filePath = newFilePath.replace(path.join(__dirname, '..'), '');
    await resource.save();

    res.status(200).json({ message: 'Resource renamed successfully', resource });
  } catch (error) {
    console.error('Error renaming resource:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a resource
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the resource by ID
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // Delete the file from the server
    const filePath = path.join(__dirname, '..', resource.filePath);
    await fs.unlink(filePath);

    // Delete the resource metadata from the database
    await Resource.findByIdAndDelete(id);

    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all resources for a tutor
router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Fetch all resources for the given email
    const resources = await Resource.find({ email });

    res.status(200).json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;