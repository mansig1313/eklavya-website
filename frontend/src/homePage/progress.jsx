import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import "./Progress.css";


const progressData = [
  { day: "Mon", week1: 80, week2: 70, week3: 75, week4: 85 },
  { day: "Tue", week1: 70, week2: 60, week3: 65, week4: 75 },
  { day: "Wed", week1: 85, week2: 75, week3: 70, week4: 90 },
  { day: "Thu", week1: 90, week2: 80, week3: 85, week4: 95 },
  { day: "Fri", week1: 60, week2: 65, week3: 70, week4: 80 },
  { day: "Sat", week1: 75, week2: 70, week3: 75, week4: 85 },
  { day: "Sun", week1: 95, week2: 85, week3: 90, week4: 100 },
];

function ProgressReport() {
  return (
    <div className="progress-report-container">
      <h3>January </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" label={{ value: "Days", position: "insideBottom", dy: 10 }} />
          <YAxis label={{ value: "Progress (%)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="week1" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} name="Week 1" />
          <Line type="monotone" dataKey="week2" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} name="Week 2" />
          <Line type="monotone" dataKey="week3" stroke="#ffc658" strokeWidth={2} activeDot={{ r: 8 }} name="Week 3" />
          <Line type="monotone" dataKey="week4" stroke="#ff7300" strokeWidth={2} activeDot={{ r: 8 }} name="Week 4" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProgressReport;
