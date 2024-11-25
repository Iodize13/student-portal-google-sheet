import React from 'react';

type AttendanceRecord = {
  date: string;
  status: 'p' | 'l' | 'a' | 'u';
};

interface WorkScoreTableProps {
  data: AttendanceRecord[];
}

const getStatusColor = (status: string): string => {
  const colors: { [key: string]: string } = {
    p: 'bg-green-500', // Change to an actual color class
    l: 'bg-yellow-500', 
    a: 'bg-red-500', 
    u: 'bg-slate-600', 
  };
  return colors[status] || 'bg-slate-600';
};

// Function to convert the status character ('p', 'l', 'a', or '') to a full status string
const getStatusFromCharacter = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    p: 'Present',
    l: 'Late',
    a: 'Absent',
    '': 'Unknown',  // If blank, return 'Unknown'
  };
  return statusMap[status] || 'Unknown';  // Default to 'Unknown' if the character doesn't match
};

const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

const WorkScoreTable: React.FC<WorkScoreTableProps> = ({ data }) => {
  const classIndexes = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23]; // The different indexes you're accessing in the `record` array
  const classOffset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20];  // Offset for class names (Class 1, Class 2, etc.)

  return (
      <div>
    <table className="w-1/2 border-collapse border border-slate-300 rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-slate-200 text-center">
          <th className="w-1/2 p-2 border border-slate-300">Absent counts</th>
     {data.map((record) => (
          <th className="w-1/2 p-2 border border-slate-300">{record[19]}</th>
     ))}
        </tr>
        <tr className="bg-slate-200 text-center">
          <th className="w-1/2 p-2 border border-slate-300">Attendance points</th>
     {data.map((record) => (
          <th className="w-1/2 p-2 border border-slate-300">{record[20]}</th>
     ))}
        </tr>
      </thead>
    </table>

    <br></br>

    <table className="w-full rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-slate-200 text-center">
          <th className="w-1/2 p-2">Class</th>
          <th className="w-1/2 p-2 ">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record, index) => (
          // Iterating over classIndexes and classOffset inside the map loop
          classIndexes.map((classIndex, idx) => (
            <tr key={`${index}-${classIndex}`} className="even:bg-slate-100 hover:bg-slate-100 text-center">
              <td className="w-1/2 p-2 border border-slate-300">Class {classOffset[idx]}</td>
              <td className={`text-white font-bold w-1/2 p-2 border border-slate-300 ${getStatusColor(record[classIndex])}`}>
                {getStatusFromCharacter(record[classIndex])}
              </td>
            </tr>
          ))
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default WorkScoreTable;
