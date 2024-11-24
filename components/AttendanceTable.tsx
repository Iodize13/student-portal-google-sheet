import React from 'react';

type AttendanceRecord = {
  title: string;
  fullScore: number;
  scoreAchieved: number | string;
  fullPercentile: number;
  percentileAchieved: number | string;
};

interface AttendanceTableProps {
  data: AttendanceRecord[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ data }) => {
  const calculateTotal = (field: keyof AttendanceRecord): number =>
    data.reduce((total, item) => {
      const value = item[field];
      return typeof value === 'number' ? total + value : total;
    }, 0);

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border border-gray-300">Title</th>
            <th className="p-2 border border-gray-300">Full Score</th>
            <th className="p-2 border border-gray-300">Score Achieved</th>
            <th className="p-2 border border-gray-300">Full Percentile</th>
            <th className="p-2 border border-gray-300">Percentile Achieved</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-2 border border-gray-300">{record.title}</td>
              <td className="p-2 border border-gray-300 text-center">{record.fullScore}</td>
              <td className="p-2 border border-gray-300 text-center">
                {record.scoreAchieved || '-'}
              </td>
              <td className="p-2 border border-gray-300 text-center">
                {record.fullPercentile}
              </td>
              <td className="p-2 border border-gray-300 text-center">
                {record.percentileAchieved || '-'}
              </td>
            </tr>
          ))}
          <tr className="font-bold bg-gray-100">
            <td className="p-2 border border-gray-300 text-right" colSpan={4}>
              Total
            </td>
            <td className="p-2 border border-gray-300 text-center">
              {calculateTotal('fullScore')}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
