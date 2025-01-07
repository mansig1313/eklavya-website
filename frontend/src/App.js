import React from "react";
import Land from "./components/landingpg/Land";
import Navbar from "./components/landingpg/Navbar";
import AboutUs from "./components/landingpg/AboutUs";
import Services from "./components/landingpg/Services";

const App = () => {
  return (
    <React.StrictMode>
      <Navbar />
      <Land />
      <AboutUs />
      <Services />
    </React.StrictMode>
  );
};

export default App;
