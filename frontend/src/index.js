import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/landingpg/register/LoginPage';
import AboutUs from './components/landingpg/AboutUs';
import Services from './components/landingpg/Services';
import Register from './components/landingpg/register/Register';
import TutorHomePage from './homePage/tutor.jsx';
import StudentHomePage from './homePage/student.jsx';
import ParentHomePage from './homePage/parent.jsx';
import CoursePage from './CourseMainPage/CoursePage/CoursePage.jsx';
import './CourseMainPage/CoursePage/CoursePage.css';
import TutorSelectionPage from './components/TutorSelectionPage/TutorSelectionPage.jsx';
import './components/TutorSelectionPage/TutorSelectionPage.css';
import ResourcePage from './Resourcepage/ResourcePage.jsx';
import MessagePage from './MessagePage/MessagePage.jsx';
import './MessagePage/MessagePage.css';
import StudentMyCoursepg from './components/StudentMyCoursepg/StudentMyCoursepg.jsx';
import './components/StudentMyCoursepg/StudentMyCoursepg.css';
import PaymentPage from './PaymentPage/PaymentPage.jsx';
import './PaymentPage/PaymentPage.css';
import FeedbackPage from './FeedbackPage/Feedback.jsx';
import './FeedbackPage/Feedback.css';
import MyTutors from '../src/components/Stu_MyTutors/Stu_MyTutors.jsx';
import '../src/components/Stu_MyTutors/Stu_MyTutors.css';
import WeeklyTests from '../src/WeeklyTests/WeeklyTest.jsx';
import '../src/WeeklyTests/WeeklyTest.css';
import StudentProfilePage from './homePage/studentprofile.jsx';
import StudentResourcePage from './MyResourcePage/MyResource.jsx'
import TutorRegister from "./components/landingpg/register/tutorregister.jsx";



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
        <Route path="/resource" element={<ResourcePage />} />
        <Route path="/:stream" element={<TutorSelectionPage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/mycourse" element={<StudentMyCoursepg />} />
        <Route path="/payments" element={<PaymentPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/mytutors" element={<MyTutors />} />
                <Route path="/WeeklyTests" element={<WeeklyTests/>} />
        <Route path = "/profile" element={<StudentProfilePage/>}/>
        <Route path = "/sturesource" element={<StudentResourcePage/>}/>
        <Route path = "/tutor-register" element={<TutorRegister/>}/>

           

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
