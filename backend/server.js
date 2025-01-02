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

app.listen(PORT,()=>{
    console.log(`Server is Running on port  ${PORT}`);
});