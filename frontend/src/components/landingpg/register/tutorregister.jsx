// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Register({ onRegistrationSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        certification: null,
        resume: null,
        profilePicture: null,
        qualification: '',
        gender: '',
        availability: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            const response = await axios.post('http://localhost:5000/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 201) {
                alert(response.data.message);
                onRegistrationSuccess(response.data.user);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="tutor-form">
                <h2>Register</h2>
                <label>Name<span>*</span></label>
                <input type="text" name="name" onChange={handleChange} required />
                
                <label>Email<span>*</span></label>
                <input type="email" name="email" onChange={handleChange} required />
                
                <label>Age</label>
                <input type="number" name="age" onChange={handleChange} />
                
                <label>Gender</label>
                <select name="gender" onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                
                <label>Availability (hours/day or days/week)</label>
                <input type="text" name="availability" onChange={handleChange} />
                
                <label>Highest Qualification</label>
                <input type="text" name="qualification" onChange={handleChange} />

                <label>Certification</label>
                <input type="file" name="certification" onChange={handleChange} />
                
                <label>Resume</label>
                <input type="file" name="resume" onChange={handleChange} />
                
                <label>Profile Picture</label>
                <input type="file" name="profilePicture" onChange={handleChange} />
                
                
                <label>Password<span>*</span></label>
                <input type="password" name="password" onChange={handleChange} required />
                
                <label>Confirm Password<span>*</span></label>
                <input type="password" name="confirmPassword" onChange={handleChange} required />
                
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
