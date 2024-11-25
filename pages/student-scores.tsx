import React, { useState, useEffect } from 'react';

const StudentScores = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    // Retrieve studentId from localStorage or another session mechanism
    const id = localStorage.getItem('studentId'); // Replace with a secure mechanism
    if (id) {
      setStudentId(id);
    } else {
      setError('Student ID not found. Please log in.');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!studentId) return;

      try {
        const res = await fetch(`/api/getStudentScores?studentId=${studentId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch data');
        }

        setData(data);
      } catch (err) {
        console.error('Error fetching data:', err.message);
        setError(err.message);
      }
    };

    fetchData();
  }, [studentId]);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Scores and Attendance</h1>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-4 py-2">Student ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Class 1</th>
              <th className="border border-gray-300 px-4 py-2">Class 2</th>
              {/* Add more headers as needed */}
              <th className="border border-gray-300 px-4 py-2">Absent Counts</th>
              <th className="border border-gray-300 px-4 py-2">Attendance Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-300 px-4 py-2">{item[1]}</td>
                <td className="border border-gray-300 px-4 py-2">{item[2]}</td>
                <td className="border border-gray-300 px-4 py-2">{item[4]}</td>
                <td className="border border-gray-300 px-4 py-2">{item[5]}</td>
                {/* Add more columns as needed */}
                <td className="border border-gray-300 px-4 py-2">{item[19]}</td>
                <td className="border border-gray-300 px-4 py-2">{item[20]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentScores;
