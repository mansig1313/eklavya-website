import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/landingpg/register/LoginPage';
import AboutUs from './components/landingpg/AboutUs';
import Services from './components/landingpg/Services';
import Register from './components/landingpg/register/Register';
import TutorHomePage from './homePage/Tutor.jsx';
import StudentDashboard from './homePage/Student.jsx';
import ParentHomePage from './homePage/Parent.jsx';
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
import Calendar from './homePage/Calendar.jsx';
import './homePage/Calendar.css';
import MyTutors from '../src/components/Stu_MyTutors/Stu_MyTutors.jsx';
import '../src/components/Stu_MyTutors/Stu_MyTutors.css';
import WeeklyTests from '../src/WeeklyTests/WeeklyTest.jsx';
import '../src/WeeklyTests/WeeklyTest.css';
import StudentProfilePage from './homePage/StudentProfile.jsx';
import StudentResourcePage from './MyResourcePage/MyResource.jsx'
import TutorRegister from "./components/landingpg/register/Tutorregister.jsx";
import Progress from './homePage/Progress.jsx';
import StuCourseCompletion from "./components/StuCourseCompletion/StuCourseCompletion.jsx";
import './components/StuCourseCompletion/StuCourseCompletion.css';
import UpcomingSessions from './components/UpcomingSessions/UpcomingSessions.jsx';
import './components/UpcomingSessions/UpcomingSessions.css';
import TutorFeedback from './homePage/TutorFeedback.jsx';
import CreateTest from './CreateTestPage/CreateTest.jsx';
import EditTestPage from './CreateTestPage/TestEditor.jsx';
import PaymentHistory from './homePage/Paymenthistory.jsx';
import JitsiMeeting from "./components/UpcomingSessions/JitsiMeeting.jsx";
import TutorProfile from "./homePage/TutorProfile.jsx";
import Coursepage from "./CourseMainPage/course_dash/Coursepage.jsx"
import TestPage from "./testpage/TestPage.jsx"
import CourseDashboard from "./CourseMainPage/course_dash/CourseDashboard.jsx";
import TestCreation from "./CourseMainPage/course_dash/TestCreation.jsx";
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
        <Route path="/student-home" element={<StudentDashboard />} />
        <Route path="/tutor-home" element={<TutorHomePage />} />
        <Route path="/parent-home" element={<ParentHomePage />} />
        <Route path="/course-page" element={<CoursePage />} />
        <Route path="/resource" element={<ResourcePage />} />
        <Route path="/:stream" element={<TutorSelectionPage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/mycourse" element={<StudentMyCoursepg />} />
        <Route path="/payments" element={<PaymentPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/mytutors" element={<MyTutors />} />
        <Route path="/WeeklyTests" element={<WeeklyTests/>} />
        <Route path = "/profile" element={<StudentProfilePage/>}/>
        <Route path = "/sturesource" element={<StudentResourcePage/>}/>
        <Route path = "/tutor-register" element={<TutorRegister/>}/>
        <Route path="/progress" element={<Progress />} />  
        <Route path="/StuCourseCompletion" element={<StuCourseCompletion/>} />  
        <Route path="/UpcomingSessions" element={<UpcomingSessions/>} /> 
        <Route path="/tutorfeedback" element={<TutorFeedback/>} /> 
        <Route path="/UpcomingSessions" element={<UpcomingSessions/>} />
        <Route path="/create-test/:courseId" element={<TestCreation />} />        <Route path="/test-editor/:testId" element={<EditTestPage />} />
        <Route path="/paymenthistory" element={<PaymentHistory />} />
        <Route path="/session/:roomId" element={<JitsiMeeting />} />
        <Route path="/tutor-profile" element={<TutorProfile />} />
        <Route path="/coursepage" element={<Coursepage />} />
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/course-dashboard/:courseId" element={<CourseDashboard />} />      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
