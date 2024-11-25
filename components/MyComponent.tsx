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
            Student ID: {item[1]}, Name : {item[2]},
            Class 1: {item[4]},
            Class 2: {item[5]},
            Class 3: {item[6]},
            Class 4: {item[7]},
            Class 5: {item[8]},
            Class 6: {item[9]},
            Class 7: {item[10]},
            Class 8: {item[11]},
            Class 9: {item[12]},
            Class 10: {item[13]},
            Class 11: {item[14]},
            Class 12: {item[15]},
            Class 13: {item[16]},
            Class 14: {item[17]},
            Class 15: {item[18]},
            Class 18: {item[21]},
            Class 19: {item[22]},
            Class 20: {item[23]},
            absent counts: {item[19]},
            Att points: {item[20]},
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentScores;
