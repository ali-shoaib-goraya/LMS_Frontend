import React from 'react';

const OBEPage = () => {
  const outcomes = [
    { id: 1, course: 'Mathematics', outcome: 'Understanding of calculus concepts', status: 'Achieved' },
    { id: 2, course: 'Physics', outcome: 'Application of mechanics principles', status: 'In Progress' },
    { id: 3, course: 'Chemistry', outcome: 'Laboratory safety and procedures', status: 'Achieved' },
    // Add more outcomes as needed
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Outcome Based Education</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          {outcomes.map((outcome) => (
            <div key={outcome.id} className="mb-4 p-4 border rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">{outcome.course}</h3>
              <p className="mt-1 text-sm text-gray-600">{outcome.outcome}</p>
              <span 
                className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  outcome.status === 'Achieved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {outcome.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OBEPage;
