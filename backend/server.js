const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();
app.use(express.json());
app.use(cors({origin : 'http://localhost:3000',credentials : true}));

const PORT = process.env.PORT || 5000 ;

const userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'tutor'], required: true }
});

const User = mongoose.model('User', userSchema);

// Register Route
app.post('/api/auth/register', async (req, res) => {
    const {name, email, password, role } = req.body;
    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });
        
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: "Invalid password" });

        res.status(201).json({
            success:true,
            message: "Login successful",
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
            }
        });

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
        
    } catch (error) {
        res.status(500).json({ error: "Error logging in user" });
    }
});

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

//Profile Schema 
const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parentEmail: { type: String, required: true },
    linkedin: String,
    github: String,
    twitter: String,
    website: String,
    profilePicture: String,
    profileVisibility: { type: Boolean, default: true },
});

const Profile = mongoose.model('Profile', profileSchema);

//Fetch profile
app.get('/api/profile/:email', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const profile = await Profile.findOne({ userId: user._id });
        if (!profile) return res.status(404).json({ error: "Profile not found" });

        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Error fetching profile" });
    }
});

//Update Profile
app.post('/api/profile', authenticateToken, async (req, res) => {
    try {
        const { email, ...profileData } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const updatedProfile = await Profile.findOneAndUpdate(
            { userId: user._id },
            { ...profileData },
            { new: true, upsert: true }
        );

        res.json({ success: true, message: "Profile updated successfully", profile: updatedProfile });
    } catch (error) {
        res.status(500).json({ error: "Error updating profile" });
    }
});

//upload profile picture 
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fileUpload = require('express-fileupload');

app.use(fileUpload());

// Ensure this route exists and matches the frontend API call
app.post('/upload-profile-picture', authenticateToken, async (req, res) => {
    const file = req.files.profilePicture; // Assuming you're using 'express-fileupload'

    // Check if file is uploaded
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Define the path where the image will be saved
    const uploadPath = __dirname + '/uploads/' + file.name;

    // Move the file to the specified path
    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading file', error: err });
        }

        // Send the file URL back as response
        res.json({ imageUrl: `http://localhost:5000/uploads/${file.name}` });
    });
});



app.listen(PORT,()=>{
    console.log(`Server is Running on port  ${PORT}`);
});