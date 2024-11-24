// components/StudentScores.js (or MyComponent.tsx)
import React, { useState, useEffect } from 'react';

const StudentScores = ({ studentId }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // useEffect to trigger the fetchData when studentId changes
  useEffect(() => {
      // Define the fetchData function inside useEffect
      const fetchData = async () => {
          setError(null);
          try {
              const res = await fetch(`/api/getStudentScores?studentId=${studentId}`);
              const data = await res.json();

              if (!res.ok) {
                  throw new Error(data.error || 'Failed to fetch data');
              }

              setData(data);
          } catch (err) {
              console.error('Error in fetchData:', err.message);  // Log the error details here
              setError(err.message);  // Display error in the UI
          }
      };

      // Call fetchData only if studentId is available
      if (studentId) {
          fetchData();
      }
  }, [studentId]);  // Dependency array: fetchData will run when studentId changes

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle loading state
  if (!data) {
    return <div>Loading...</div>;
  }

  // Render the data once it's fetched successfully
  return (
    <div>
      <h1>Scores and Attendance</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Score: {item[1]}, Attendance: {item[2]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentScores;
