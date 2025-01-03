import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/landingpg/register/LoginPage';
import AboutUs from './components/landingpg/AboutUs';
import Services from './components/landingpg/Services';
import Register from './components/landingpg/register/Register';
import TutorHomePage from '../src/homePage/practice_proj/tutor.js';
import StudentHomePage from '../src/homePage/practice_proj/student.js';
import ParentHomePage from '../src/homePage/practice_proj/parent.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/service" element={<Services />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student-home" element={<StudentHomePage />} />
      <Route path="/tutor-home" element={<TutorHomePage />} />
      <Route path="/parent-home" element={<ParentHomePage />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
