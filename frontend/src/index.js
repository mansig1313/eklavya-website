import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/landingpg/register/LoginPage';
import AboutUs from './components/landingpg/AboutUs';
import Services from './components/landingpg/Services';
import Register from './components/landingpg/register/Register';
import TutorHomePage from '../src/homePage/tutor.jsx';
import StudentHomePage from '../src/homePage/student.jsx';
import ParentHomePage from '../src/homePage/parent.jsx';
import CoursePage from '../src/CourseMainPage/CoursePage/CoursePage.jsx';
import '../src/CourseMainPage/CoursePage/CoursePage.css';
import TutorSelectionPage from '../src/components/TutorSelectionPage/TutorSelectionPage.jsx';
import '../src/components/TutorSelectionPage/TutorSelectionPage.css';
import ResourcePage from './Resourcepage/ResourcePage.jsx';
import MessagePage from '../src/MessagePage/MessagePage.jsx';
import '../src/MessagePage/MessagePage.css';
import StudentMyCoursepg from '../src/components/StudentMyCoursepg/StudentMyCoursepg.jsx';
import '../src/components/StudentMyCoursepg/StudentMyCoursepg.css';
import PaymentPage from '../src/PaymentPage/PaymentPage.jsx';
import '../src/PaymentPage/PaymentPage.css';
import FeedbackPage from '../src/FeedbackPage/Feedback.jsx';
import '../src/FeedbackPage/Feedback.css';




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
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
        <Route path="/course-page" element={<CoursePage />} />
        <Route path = "/resource" element={<ResourcePage/>}/>
        <Route path="/:stream" element={<TutorSelectionPage />} />
        <Route path="/messages" element={<MessagePage />} /> {/* Added MessagePage route */}
        <Route path="/mycourse" element={<StudentMyCoursepg />} /> 
        <Route path="/payments" element={<PaymentPage />} /> {/* Added Payment Page route */}
        <Route path="/feedback" element={<FeedbackPage />} />


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
