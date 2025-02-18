import { Route, Routes } from "react-router-dom";
import Classes from "./components/StudentOverview/Classes.jsx";
import './components/StudentOverview/Classes.css';
// import Tests from "../pages/Tests";
// import Assignments from "../pages/Assignments";
// import Attendance from "../pages/Attendance";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/classes" element={<Classes />} />
      {/* <Route path="/tests" element={<Tests />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/attendance" element={<Attendance />} /> */}
    </Routes>
  );
};

export default AppRoutes;
