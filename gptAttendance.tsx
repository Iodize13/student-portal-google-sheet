import React from 'react';

type AttendanceRecord = {
  date: string;
  status: 'p' | 'l' | 'a' | 'u';
};

interface AttendanceTableProps {
  attendance: string[]; // An array of attendance statuses ('p', 'l', 'a', 'u')
  dates: string[]; // An array of date strings
}

const getStatusColor = (status: string): string => {
  const colors: { [key: string]: string } = {
    p: 'bg-green-500', // Present
    l: 'bg-yellow-500', // Late
    a: 'bg-red-500', // Absent
    u: 'bg-slate-600', // Unknown
  };
  return colors[status] || 'bg-slate-600';
};

// Function to convert the status character ('p', 'l', 'a', or 'u') to a full status string
const getStatusFromCharacter = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    p: 'Present',
    l: 'Late',
    a: 'Absent',
    u: 'Unknown',  // If blank, return 'Unknown'
  };
  return statusMap[status] || 'Unknown';  // Default to 'Unknown' if the character doesn't match
};

const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({ attendance, dates }) => {
  return (
    <div className="flex-col">
      <div className="flex items-center justify-center">
        <table className="w-full sm:w-96 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-slate-200 text-center">
              <th className="bg-custom-orange text-white font-medium p-2 border-b border-slate-300">Date</th>
              {dates.map((date, index) => (
                <th key={index} className="p-2 border-b border-slate-300 font-medium">{formatDate(date)}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      <br />

      <div className="h-96 overflow-y-auto flex">
        <table className="flex-col w-full rounded-lg overflow-hidden">
          <thead className="sticky top-0 bg-white shadow-md">
            <tr className="text-custom-orange text-center border-slate-300 border-b-2">
              <th className="p-2">Class</th>
              <th className="w-1/2 p-2">Date</th>
              <th className="w-1/2 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((status, index) => (
              <tr key={index} className="odd:bg-slate-100 hover:bg-slate-300 text-center">
                <td className="bg-slate-200 p-2 border-b border-slate-300">{index + 1}</td>
                <td className="p-2 border-b border-slate-300">{formatDate(dates[index])}</td>
                <td className={`text-center justify-center text-white font-semibold border-b border-slate-300`}>
                  <div className={`inline-flex ${getStatusColor(status)} py-1 px-2 rounded shadow-lg w-1/2 lg:w-1/3 justify-center`}>
                    {getStatusFromCharacter(status)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
