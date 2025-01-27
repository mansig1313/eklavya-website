const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fileUpload = require('express-fileupload');
const http = require('http');  // Import http module
const { Server } = require('socket.io');  // Import socket.io's Server class
const { authenticate } = require('passport');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const server = http.createServer(app); // Create the HTTP server



// Dynamic CORS based on environment
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',  // Default to localhost for development
    credentials: true,
};
0;


const io = new Server(server, {
    cors: corsOptions,
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const PORT = process.env.PORT || 5000;

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

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: "Invalid password" });

        // Generate JWT token
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
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ error: "Access denied" });
    }

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET || 'secretKey', (err, user) => {
        if (err) {
            console.log("Token verification failed:",err);
        
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = user;
        console.log("Authenticated user:", user);
        next();
    });
};

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
            if(!profile)return
            res.status(404).json({error:"Profile not found"});
            res.json(profile);
        } catch(error){
            res.status(500).json({error: "Error Fetching Profile"});
        }
    });

//Update Profile
app.put('/api/profile', authenticateToken,
    async(req,res) => {
        try{
            console.log("Profile update request body:",req.body); //Debugging
            console.log("Authenticated User".req.user); //Debugging

            const profileData = {
                userId: req.user.id,
                name:req.body.name, //Update name
                email:req.body.email, //Update email
                parentEmail : req.body.parentEmail,
                linkedin : req.body.linkedin,
                github:req.body.github,
                twitter : req.body.twitter,
                website : req.body.website,
                profilePicture: req.body.profilePicture,
                profileVisibility : req.bpdy.profileVisibility
            };

            const updatedProfile = await Profile.findOneAndUpdate(
                {userId : req.user.id},
                profileData,
                {new : true , upsert : true} //Upsert: true creates new profile if it doesn't exist
            );

            console.log("Updated Profile:",updatedProfile); //Debugging
            res.json({success : true , message:"Profile Updated Successfully" , profile:updatedProfile});
        } catch(error){
            console.error("Error Updating Profile:",error);
            res.status(500).json({error:"Error updating profile"});
        }
    });

//Upload Profile Picture
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Use backticks for template literals
    },
});
const upload = multer({storage});

app.post('/upload-profile-picture' , authenticateToken, upload.single('profilePicture'),
   async(req,res) => {
    if(!req.file){
        return res.status(400).json({message : 'No File Upload'});
    }

   const imageUrl = 'http://localhost:5000/uploads/${req.file.filename}';
   res.json({imageUrl});

   });

   //Server Uploaded Files
   app.use('/uploads' , express.static(path.join(__dirname , 'uploads')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});

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
