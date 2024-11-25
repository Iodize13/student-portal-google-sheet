import React from 'react';

type StudentScoreRecord = {
  studentId: string;
  name: string;
  absentCounts: number;
  attendancePoints: number;
  classes: { [key: string]: number }; // Dynamic class scores
};

interface StudentScoresTableProps {
  data: StudentScoreRecord[];
}

const StudentScoresTable: React.FC<StudentScoresTableProps> = ({ data }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="p-2 border border-gray-300">Student ID</th>
          <th className="p-2 border border-gray-300">Name</th>
          <th className="p-2 border border-gray-300">Absent Counts</th>
          <th className="p-2 border border-gray-300">Attendance Points</th>
          <th className="p-2 border border-gray-300">Class Scores</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="p-2 border border-gray-300">{record.studentId}</td>
            <td className="p-2 border border-gray-300">{record.name}</td>
            <td className="p-2 border border-gray-300">{record.absentCounts}</td>
            <td className="p-2 border border-gray-300">{record.attendancePoints}</td>
            <td className="p-2 border border-gray-300">
              <ul>
                {Object.entries(record.classes).map(([className, score], idx) => (
                  <li key={idx}>
                    {className}: {score}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentScoresTable;
