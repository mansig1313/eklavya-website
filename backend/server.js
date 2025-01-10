const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const app = express();
dotenv.config(); // Load environment variables

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));


app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const PORT = process.env.PORT || 5000;

// Ensure 'uploads' directory exists
const fs = require('fs');
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
        }
    },
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

// User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'tutor'], required: true },
});
const User = mongoose.model('User', userSchema);

// Profile schema for student
const profileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
    website: { type: String },
    profilePicture: { type: String },
    profileVisibility: { type: Boolean, default: true },
    dataSharing: { type: Boolean, default: false },
});
const Profile = mongoose.model('Profile', profileSchema);

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        console.log('Authentication error: No token provided');
        return res.status(401).json({ error: 'Access denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Authentication error: Invalid token');
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};


// Register route
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Register error: User already exists');
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Login error: User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Login error: Invalid password');
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: { name: user.name, email: user.email, role: user.role },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Error logging in user' });
    }
});

// Route to upload profile picture
app.post('/upload-profile-picture', authenticateToken, upload.single('profilePicture'), async (req, res) => {
    try {
        if (!req.file) {
            console.log('Upload error: No file uploaded');
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        const profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        profile.profilePicture = imageUrl;
        await profile.save();
        res.status(200).json({ message: 'Profile picture uploaded successfully', imageUrl });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Error uploading profile picture' });
    }
});

// Route to get student profile
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error('Profile retrieval error:', error);
        res.status(500).json({ error: 'Error retrieving profile' });
    }
});

// Route to update student profile
app.put('/api/profile', authenticateToken, async (req, res) => {
    const { linkedin, github, twitter, website, profileVisibility, dataSharing } = req.body;
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            profile = new Profile({ user: req.user.id, linkedin, github, twitter, website, profileVisibility, dataSharing });
        } else {
            profile.linkedin = linkedin || profile.linkedin;
            profile.github = github || profile.github;
            profile.twitter = twitter || profile.twitter;
            profile.website = website || profile.website;
            profile.profileVisibility = profileVisibility !== undefined ? profileVisibility : profile.profileVisibility;
            profile.dataSharing = dataSharing !== undefined ? dataSharing : profile.dataSharing;
        }
        await profile.save();
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ error: 'Error updating profile' });
    }
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});