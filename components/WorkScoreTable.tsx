import React from 'react';

type AttendanceRecord = {
  date: string;
  status: 'Present' | 'Late' | 'Absent' | 'Unknown';
};

interface WorkScoreTableProps {
  data: AttendanceRecord[];
}

const getStatusColor = (status: string): string => {
  const colors: { [key: string]: string } = {
    Present: 'bg-present',
    Late: 'bg-late',
    Absent: 'bg-absent',
    Unknown: 'bg-unknown',
  };
  return colors[status] || 'bg-unknown';
};

const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

const WorkScoreTable: React.FC<WorkScoreTableProps> = ({ data }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="p-2 border border-gray-300">Date</th>
          <th className="p-2 border border-gray-300">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="p-2 border border-gray-300">{formatDate(record.date)}</td>
            <td className={`p-2 border border-gray-300 ${getStatusColor(record.status)}`}>
              {record.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkScoreTable;
