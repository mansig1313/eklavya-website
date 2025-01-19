const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');
const http = require('http');

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'defaultSecretKey';  // Default secret if the env var is not set
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/feedbackDB';  // Mongo URI from env

// Retry logic for MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        setTimeout(connectDB, 5000);  // Retry after 5 seconds if connection fails
    }
};
connectDB();

const app = express();
const server = http.createServer(app);

// Dynamic CORS based on environment
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',  // Default to localhost for development
    credentials: true,
};
const io = new Server(server, {
    cors: corsOptions,
});

app.use(express.json());
app.use(cors(corsOptions));

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
        const newUser = new User({ name, email, password: hashedPassword, role });
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

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: { name: user.name, email: user.email, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ error: "Error logging in user" });
    }
});

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

// Get all feedbacks
app.get('/api/feedbacks', authenticateToken, async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: "Error fetching feedbacks", error: err });
    }
});

// Add a new feedback
app.post('/api/feedbacks', authenticateToken, async (req, res) => {
    const { studentName, tutorName, message } = req.body;

    if (!studentName || !tutorName || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newFeedback = new Feedback({ studentName, tutorName, message });
        await newFeedback.save();
        res.status(201).json({ message: "Feedback submitted successfully", feedback: newFeedback });
    } catch (err) {
        res.status(500).json({ message: "Error saving feedback", error: err });
    }
});

// Get all messages between two users
app.get('/api/messages/:senderId/:receiverId', authenticateToken, async (req, res) => {
    const { senderId, receiverId } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        }).sort({ timestamp: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving messages" });
    }
});

// Real-time messaging with WebSocket
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('sendMessage', async ({ senderId, receiverId, content }) => {
        try {
            const newMessage = new Message({ senderId, receiverId, content });
            await newMessage.save();

            // Notify the receiver
            io.emit('receiveMessage', { senderId, receiverId, content });
            console.log(`Message sent from ${senderId} to ${receiverId}: ${content}`);
        } catch (error) {
            console.error('Error sending message:', error.message);
            console.error('Stack Trace:', error.stack);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
