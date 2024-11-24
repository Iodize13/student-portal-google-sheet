import React from 'react';
import Layout from '../components/Layout';
import AttendanceTable from '../components/AttendanceTable';

const AttendancePage: React.FC = () => {
  const attendanceData = [
    { title: 'Unit 7 Pca', fullScore: 10, scoreAchieved: 8, fullPercentile: 5, percentileAchieved: 4 },
    { title: 'Unit 7 Task', fullScore: 10, scoreAchieved: '-', fullPercentile: 5, percentileAchieved: '-' },
    { title: 'Unit 7 Pca', fullScore: 10, scoreAchieved: 8, fullPercentile: 5, percentileAchieved: 4 },
    { title: 'Unit 7 Pca', fullScore: 10, scoreAchieved: 8, fullPercentile: 5, percentileAchieved: 4 },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Attendance</h1>
      <p className="text-gray-600 mb-4">You can track the scores of all your assignments here.</p>
      <AttendanceTable data={attendanceData} />
    </Layout>
  );
};

export default AttendancePage;
