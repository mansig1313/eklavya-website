import React from "react";
import './student.css';

const progressData = [80, 70, 85, 90, 60, 75, 95];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const StudentTestGraph = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-96">
      <h3 className="text-xl font-bold text-center mb-4">Student Test Performance</h3>
      <div className="flex items-end gap-3 h-48 border-b border-gray-300 pb-2">
        {progressData.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-8 bg-blue-500 rounded-md"
              style={{ height: `${value}%` }}
            ></div>
            <span className="text-sm mt-1">{days[index]}</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-2 text-gray-600">Test Scores (%)</div>
    </div>
  );
};

export default StudentTestGraph;
