import React from 'react';
import commentIcon from '@/assets/comment.png';
import transcriptIcon from '@/assets/transcript.png';
import clearanceIcon from '@/assets/clearance.png';
import academicIcon from '@/assets/academic.png';
import Logo from '@/assets/logo.png';
import FacebookIcon from '@/assets/facebook.png';
import TwitterIcon from '@/assets/x.png';
import LinkedInIcon from '@/assets/linkedin.png';

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

      {/* Footer */}
      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About QOBE Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">About QOBE</h3>
              <p className="text-sm text-gray-600 mb-4">
                QOBE is the most widely used Outcome Based LMS in the region. QOBE offers you the framework and necessary tools to ensure attainment of learning outcomes and is compliant with multiple global program accreditations.
              </p>
              <p className="text-sm text-purple-700">QOBE is a product of Alfoze</p>
              <a href="/privacy" className="text-sm text-purple-700 hover:text-purple-900 block mt-2">
                Privacy Policy
              </a>
            </div>

            {/* Accreditations Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Accreditations Supported</h3>
              <ul className="space-y-2">
                {accreditations.map((accreditation, index) => (
                  <li key={index} className="text-purple-700 text-sm hover:text-purple-900">
                    {accreditation}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
              <p className="text-sm text-gray-800 mb-2">Sales & Partnerships</p>
              <p className="text-sm text-purple-700 mb-2">Email: mbilal2021@namal.edu.pk, alishoaib2021@namal.edu.pk</p>
              <p className="text-sm text-gray-800 mb-2">WhatsApp +92 (308) 584-8106, +92 (304) 189-2084</p>
              <p className="text-sm text-gray-800 mb-2">OR</p>
              <a href="/contact" className="text-sm text-purple-700 hover:text-purple-900">
                Contact Us
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src={Logo} alt="QOBE Logo" className="h-8 mr-4" />
              <div className="text-sm text-gray-600">
                <p>2015-2024 © All Rights Reserved. Alfoze Technologies (Pvt) Ltd.</p>
                <p>QOBE Version : 3.0.001</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-80">
                <img src={FacebookIcon} alt="Facebook" className="h-6 w-6" />
              </a>
              <a href="#" className="hover:opacity-80">
                <img src={TwitterIcon} alt="Twitter" className="h-6 w-6" />
              </a>
              <a href="#" className="hover:opacity-80">
                <img src={LinkedInIcon} alt="LinkedIn" className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MiscPage;
