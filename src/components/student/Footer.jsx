import React from 'react';
import Logo from '../../assets/logo.png'; // Adjust the path as needed
import FacebookIcon from '../../assets/facebook.png'; // Replace with your actual path
import TwitterIcon from '../../assets/x.png';
import LinkedInIcon from '../../assets/linkedin.png';

const Footer = ({ accreditations }) => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About QOBE Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About QOBE</h3>
            <p className="text-sm text-gray-600 mb-4">
              LMS is the most widely used Outcome Based Learning Management System (LMS) in the region. 
              It offers a comprehensive framework and the necessary tools to ensure the attainment of 
              learning outcomes and is compliant with multiple global program accreditations.
            </p>
            <p className="text-sm text-purple-700">LMS is a product of Alfoze Technologies (Pvt) Ltd.</p>
            <a href="/privacy" className="text-sm text-purple-700 hover:text-purple-900 block mt-2">
              Privacy Policy
            </a>
          </div>

          {/* Accreditations Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Accreditations Supported</h3>
            <ul className="space-y-2">
              {accreditations?.map((accreditation, index) => (
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
            <p className="text-sm text-purple-700 mb-2">Email: mbilal2021@namal.edu.pk, 
                alishoaib2021@namal.edu.pk</p>
            <p className="text-sm text-gray-800 mb-2">WhatsApp: +92 (308) 584-8106, 
                +92 (304) 189-2084</p>
            <p className="text-sm text-gray-800 mb-2">OR</p>
            <a href="/contact" className="text-sm text-purple-700 hover:text-purple-900">
              Contact Us
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row 
        justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={Logo} alt="QOBE Logo" className="h-8 mr-4" />
            <div className="text-sm text-gray-600">
              <p>2015-2024 © All Rights Reserved. Alfoze Technologies (Pvt) Ltd.</p>
              <p>LMS Version: 3.0.001</p>
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
  );
};

export default Footer;
