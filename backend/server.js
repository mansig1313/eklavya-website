const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require("body-parser");

=======
const multer = require('multer');
const path = require('path');
const fileUpload = require('express-fileupload');
const http = require('http');  // Import http module
const { Server } = require('socket.io');  // Import socket.io's Server class
const { authenticate } = require('passport');
>>>>>>> 8cbba083ff66b3f5ceb240df3c2206f7a9989518

dotenv.config();
const authenticateToken = (req, res, next) => {
    try {
        // Retrieve token from headers
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            console.log("No token provided");
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        // Extract token from 'Bearer <token>' format
        const token = authHeader.split(" ")[1];
        if (!token) {
            console.log("Malformed authorization header");
            return res.status(401).json({ error: "Access denied. Invalid token format." });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET || 'secretKey', (err, decoded) => {
            if (err) {
                console.log("Token verification failed:", err.message);
                return res.status(403).json({ error: "Invalid or expired token." });
            }

            // Attach decoded user details to the request
            req.user = decoded;

            // Log authenticated user for debugging
            console.log("Authenticated user:", decoded);

            // Proceed to the next middleware or route
            next();
        });
    } catch (error) {
        console.error("Error in authentication middleware:", error.message);
        return res.status(500).json({ error: "Internal server error." });
    }
};

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();
<<<<<<< HEAD
app.use(bodyParser.json());
const server = http.createServer(app);
app.use(cors());
=======
const server = http.createServer(app); // Create the HTTP server



>>>>>>> 8cbba083ff66b3f5ceb240df3c2206f7a9989518
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
};
0;


const io = new Server(server, {
    cors: corsOptions,
});

io.on('connection', (socket) => {
    console.log('A user connected');
});
app.use(cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT || 3000; // Use PORT from environment or default to 3000

// User schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'tutor', 'parent'], required: true },
});

const User = mongoose.model('User', userSchema);

// Feedback schema and model
const feedbackSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    tutorName: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Messages schema and model
const messageSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

// Register Route
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

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

// Add this endpoint
app.get('/api/auth/user-data', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ 
            success: true, 
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching user data" });
    }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: "Invalid password" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1h' });

        res.status(201).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            }
              // Send the token in the response
        });
    } catch (error) {
        res.status(500).json({ error: "Error logging in user" });
    }
});

// Middleware to authenticate JWT


//Profile Schema
const profileSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId , ref : 'User' , required : true},
        name : {type : String , required : true}, //Add name field
        email : {type : String , required : true}, //Add Email Field
        parentEmail : {type : String , required : true} ,
        linkedin:String,
        github: String,
        twitter: String,
        website:String,
        profilePicture : String,
        profileVisibility : {type: Boolean, default:true},
    
});

const Profile = mongoose.model('Profile' , profileSchema);

//Fetch Profile
app.get('/api/profile', authenticateToken, 
    async(req,res) => {
        try {
            const profile = await Profile.findOne({userId:req.user.id});
            if(!profile)return res.status(404).json({error:"Profile not found"});
            res.json(profile);
        } catch(error){
            res.status(500).json({error: "Error Fetching Profile"});
        }
    });

//Update Profile
app.put('/api/profile', authenticateToken,
    async(req,res) => {
        try{
            console.log("Profile update request body:", req.body);
            // Fix the syntax error in console.log
            console.log("Authenticated User:", req.user); // Fixed the string concatenation

            const profileData = {
                userId: req.user.id,
                name: req.body.name,
                email: req.body.email,
                parentEmail: req.body.parentEmail,
                linkedin: req.body.linkedin,
                github: req.body.github,
                twitter: req.body.twitter,
                website: req.body.website,
                profilePicture: req.body.profilePicture,
                profileVisibility: req.body.profileVisibility
            };

            // Add validation
            if (!profileData.name || !profileData.email) {
                return res.status(400).json({ error: "Name and email are required" });
            }

            const updatedProfile = await Profile.findOneAndUpdate(
                {userId: req.user.id},
                profileData,
                {new: true, upsert: true, runValidators: true}
            );

            console.log("Updated Profile:", updatedProfile);
            res.json({
                success: true,
                message: "Profile Updated Successfully",
                profile: updatedProfile
            });
        } catch(error){
            console.error("Error Updating Profile:", error);
            res.status(500).json({
                error: "Error updating profile",
                details: error.message
            });
        }
    });

//Upload Profile Picture
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

app.post('/upload-profile-picture', authenticateToken, upload.single('profilePicture'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        // Construct the file URL
        const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        
        // Retrieve the authenticated user's ID
        const userId = req.user.id;

        // Update the user's profile in the database
        const updatedProfile = await User.findByIdAndUpdate(
            userId,
            { profilePicture: imageUrl },
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: 'Profile picture uploaded and updated successfully',
            profile: updatedProfile,
        });
    } catch (err) {
        console.error('Error updating profile picture:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//update profile
app.put("/update-profile", authenticateToken, async (req, res) => {
    try {
        // Check if req.user is populated
        if (!req.user) {
            console.log("User not authenticated");
            return res.status(401).json({ error: "User not authenticated" });
        }

        console.log("Authenticated user:", req.user);  // Log for debugging

        const userId = req.user.id;  // Ensure the id is available in req.user
        const updateData = req.body;  // Data to update the profile

        // Update the user profile in the database
        const updatedProfile = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({ error: "User not found" });
        }

        // Respond with success message
        res.status(200).json({ message: "Profile updated successfully", updatedProfile });

    } catch (err) {
        console.error("Error updating profile:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


   //Server Uploaded Files
   app.use('/uploads' , express.static(path.join(__dirname , 'uploads')));

//calendar

  
  const eventSchema = new mongoose.Schema({
    date: String,
    text: String,
  });
  
  const Event = mongoose.model("Event", eventSchema);
  
  app.get("/events", async (req, res) => {
    const events = await Event.find();
    res.json(events);
  });
  
  app.post("/events", async (req, res) => {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.json(newEvent);
  });
  
  app.delete("/events/:id", async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  });
 
// Start the server
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});

<<<<<<< HEAD

=======
app.post('/api/change-password', authenticateToken ,
    async(req,res) => {
        const{ currentPassword , newPassword} = req.body;

        try{
            //Find the user by ID from token
            const user = await User.findById(req.user.id);
            if(!user) return res.status(404).json({error :"User not found"});

            //Check if Current password is correct
            const isPasswordValid = await bcrypt.compare(currentPassword,user.password);
            if(!isPasswordValid)return res.status(400).json({error : "Invalid current password"});

            //hash the new password and update

            const hashedPassword = await bcrypt.hash(newPassword , 10);
            user.password = hashedPassword;
            await user.save();

            res.status(200).json({success:true, message:"Password changed successfully"});
        } catch(error){
            console.error("Error Changing password:",error);
            res.status(500).json({error: "Error changing password"});
        }

    });
>>>>>>> 8cbba083ff66b3f5ceb240df3c2206f7a9989518
