import React from "react";
import { useLocation } from "react-router-dom";

const MultipleActivity = () => {
  const course = useLocation().state?.course;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Hello World Multiple</h1>
      <p className="text-gray-600">Course: {course?.code} - {course?.title}</p>
    </div>
  );
};

export default MultipleActivity;
