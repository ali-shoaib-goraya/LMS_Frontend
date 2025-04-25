import React from 'react';
import commentIcon from '@/assets/comment.png';
import transcriptIcon from '@/assets/transcript.png';
import clearanceIcon from '@/assets/clearance.png';
import academicIcon from '@/assets/academic.png';
// import Footer from '@/components/student/Footer';


const MiscPage = () => {
  const options = [
    {
      icon: commentIcon,
      title: "Complaint / Inquiry",
      alt: "Complaint"
    },
    {
      icon: transcriptIcon,
      title: "Download Transcript - GPA",
      alt: "Transcript"
    },
    {
      icon: clearanceIcon,
      title: "Clearance Form",
      alt: "Clearance"
    },
    {
      icon: academicIcon,
      title: "Academic Periods",
      alt: "Academic"
    }
  ];

  const accreditations = [
    'Washington Accord',
    'ABET',
    'Seoul Accord',
    'Sydney Accord',
    'Dublin Accord',
    'AACSB',
    'ACBSP'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="p-6">
      {/* Header Section with Underline */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-2">
        <h1 className="text-3xl font-normal">Misc Option</h1>
        <div className="flex gap-4">
          <a href="/student" className="text-blue-600 hover:text-blue-800">Home</a>
          <span className="text-gray-500">Misc Option</span>
        </div>
      </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {options.map((option, index) => (
            <div key={index} className="flex flex-col items-center cursor-pointer group">
              <div className="w-24 h-24 flex items-center justify-center mb-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <img
                  src={option.icon}
                  alt={option.alt}
                  className="w-16 h-16"
                />
              </div>
              <span className="text-purple-700 text-center group-hover:text-purple-900">
                {option.title}
              </span>
            </div>
          ))}
        </div>
      </div>
        
        {/* Footer Section */}
    </div>
  );
};

export default MiscPage;
