import "./AboutUs.css";
import React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import eklavya from "./Eklavyarbg.png";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
    marginBottom: "3rem",
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "white" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },

  ...theme.applyStyles({
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const AboutUs = () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div id="aboutus-section">
      <div className="aboutus">About Us</div>

      <div className="aboutUsContainer">
        <div className="column" id="left1">
          <img
            src={eklavya}
            alt="img"
            style={{ width: "500px", height: "auto" }}
          />
          <div id="box"></div>
        </div>

        <div className="column" id="right1">
          <div className="accordion">
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Why Choose Us ? </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="card">
                  <Typography>
                    Our home tutor's personalized plan gives your child
                    dedicated attention, boosting their confidence and
                    performance. You can easily track progress, get instant
                    feedback, and stay involved in their learning journey.
                  </Typography>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Typography>Who Are We ? </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  EKLAVYA is a tutor matching platform for tutors and students.
                  we provide this Site to users seeking tutoring services
                  ("Students") and to users seeking to provide tutoring services
                  ("Tutors")
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                aria-controls="panel3d-content"
                id="panel3d-header"
              >
                <Typography>What We Do ? </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  EKLAVYA bridges the gap between growing learners and qualified
                  tutors by introducing a personalized learning experience.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                aria-controls="panel4d-content"
                id="panel4d-header"
              >
                <Typography>What We Can ? </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We provide personalized one-on-one tutoring with flexible
                  scheduling, resource sharing, and secure payments. Parents can
                  monitor progress, while students choose tutors and give
                  feedback for continuous improvement.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
