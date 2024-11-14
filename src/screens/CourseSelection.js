import React from "react";
import { FaUser, FaClock, FaBookOpen, FaLocationArrow } from "react-icons/fa";

function CourseSelection() {
  const courses = [
    { id: 311, name: "COM 311", description: "INTRODUCTION TO CALCULUS", icon: FaUser, time: "8:00 AM - 10:00 AM", location: "HALL A" },
    { id: 312, name: "COM 312", description: "INTRODUCTION TO JAVA", icon: FaClock, time: "10:15 AM - 12:15 PM", location: "HALL B" },
    { id: 313, name: "COM 313", description: "DATA STRUCTURES", icon: FaBookOpen, time: "1:00 PM - 3:00 PM", location: "HALL C" },
    { id: 314, name: "COM 314", description: "WEB DEVELOPMENT", icon: FaLocationArrow, time: "3:15 PM - 5:15 PM", location: "HALL D" },
  ];

  const handleSelection = (course) => {
    alert(`Navigating to details for ${course.name}`);
    // Implement routing logic if required
  };

  return (
    <div className="bg-white w-full max-w-xl mx-auto shadow-lg rounded-lg p-4">
      <header className="text-center font-semibold text-xl mb-4">COURSE SELECTION</header>
      <div className="flex flex-col space-y-4">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => handleSelection(course)}
            className="flex flex-col items-start w-full p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
          >
            <div className="flex items-center gap-4">
              <course.icon className="text-blue-500 text-2xl" />
              <div>
                <h2 className="font-semibold">{course.name}</h2>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
            </div>
            <div className="mt-2 text-gray-500">
              <p className="text-sm">{course.time}</p>
              <p className="text-sm">{course.location}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CourseSelection;
