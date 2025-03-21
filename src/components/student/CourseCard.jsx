import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="max-w-sm rounded-lg bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-500 flex items-center justify-center bg-gray-100">
          {/* Display instructor initials */}
          <span className="text-xl font-bold text-purple-700">
            {course.instructorName
              .split(' ')
              .map(name => name[0])
              .join('')}
          </span>
        </div>
      </div>

      {/* Make the course title clickable and pass data */}
      <Link
        to={{
          pathname: `/student/coursedetail`,
        }}
        state={{ course }} // Pass course data through state
        className="block text-center text-lg font-medium text-purple-700 mb-1 hover:underline"
      >
        {course.code} - {course.title}
      </Link>

      {/* Make semester & term clickable */}
      <Link
        to={{
          pathname: `/student/coursedetail`,
        }}
        state={{ course }} // Pass course data
        className="block text-center text-sm text-gray-600 mb-1 hover:underline"
      >
        {course.semester} - {course.term}
      </Link>

      <div className="text-center text-sm text-gray-600 mb-4">
        {course.instructorName}
      </div>

      <div className="text-center text-sm text-gray-600 mb-4">
        {course.term}
      </div>
    </div>
  );
};

export default CourseCard;
