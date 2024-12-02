import React from 'react';

type AttendanceRecord = {
  date: string;
  status: '1' | 'l' | '0' | 'u';
};

interface AttendanceTableProps {
  attendance: string[]; // An array of attendance statuses ('p', 'l', 'a', 'u')
  dates: string[]; // An array of date strings
}

const getStatusColor = (status: string): string => {
  const colors: { [key: string]: string } = {
    1: 'bg-green-500', // Change to an actual color class
    l: 'bg-yellow-500', 
    0: 'bg-red-500', 
    u: 'bg-slate-600', 
  };
  return colors[status] || 'bg-slate-600';
};

// Function to convert the status character ('p', 'l', 'a', or '') to a full status string
const getStatusFromCharacter = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    1: 'Present',
    l: 'Late',
    0: 'Absent',
    '': 'Unknown',  // If blank, return 'Unknown'
  };
  return statusMap[status] || 'Unknown';  // Default to 'Unknown' if the character doesn't match
};

// Function to check if a date exists at idx + 4 and return the date or '-'
const getDateOrDash = (dates: string[], idx: number): string => {
  return dates[idx + 4] ? (
    <span>
        {dates[idx + 4]}<span className="hidden md:inline"> 2024</span>
    </span>
  ) : (
    <span>-</span>
  );
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({ attendance, dates }) => {
  const classIndexes = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23]; // The different indexes you're accessing in the `record` array
  const classOffset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20];  // Offset for class names (Class 1, Class 2, etc.)

  return (
      <div className ="flex-col">
      <div className ="flex items-center justify-center pb-3">
    <table className="w-full sm:w-96 rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-slate-100 text-center">
          <th className="w-1/2 bg-orange-600 text-white font-medium p-2 border-b border-slate-300">Absent counts</th>
     {attendance.map((record) => (
          <th className="p-2 border-b border-slate-300 font-medium">{record[19]}</th>
     ))}
        </tr>
        <tr className="bg-slate-100 text-center font-medium">
          <th className="bg-orange-600 text-white p-2 font-medium">Attendance points</th>
     {attendance.map((record) => (
          <th className="w-1/2 p-2 font-medium">{record[20]}</th>
     ))}
        </tr>
      </thead>
    </table>
    </div>

    <div className="h-[26rem] rounded-lg overflow-y-auto flex justify-center">
    <table className="flex-col w-full md:w-4/5 rounded-lg overflow-hidden">
      <thead className="sticky top-0 bg-white shadow-md">
        <tr className="text-orange-600 text-center border-slate-300 border-b-2">
          <th className="w-1/6 sm:w-1/4 p-2">Classes</th>
          <th className="w-1/3 sm:w-1/2 p-2">Date</th>
          <th className="w-1/3 p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {attendance.map((record, index) => (
          // Iterating over classIndexes and classOffset inside the map loop
          classIndexes.map((classIndex, idx) => (
            <tr className="odd:bg-slate-100 hover:bg-slate-300 text-center">
              <td className="bg-slate-200 p-2 border-b border-slate-300"><span className="hidden md:inline">Class</span> {classOffset[idx]}</td>
              <td className="p-2 border-b border-slate-300">
              {getDateOrDash(dates, idx)}</td>
              <td className={`text-center justify-center text-white font-semibold w-full border-b border-slate-300 `}><div className={`inline-flex ${getStatusColor(record[classIndex])} py-1 px-2 rounded shadow-lg w-full justify-center`}>
                {getStatusFromCharacter(record[classIndex])}</div>
              </td>
              
            </tr>
          ))
        ))}
      </tbody>
    </table>
    </div>
    </div>
  );
};

export default AttendanceTable;
