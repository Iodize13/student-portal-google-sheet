import React from 'react';
import Layout from '../components/Layout';
import WorkScoreTable from '../components/WorkScoreTable';
import ErrorReportButton from '../components/ErrorReportButton';

type AttendanceRecord = {
  date: string;
  status: 'Present' | 'Late' | 'Absent' | 'Unknown';
};

const WorkScorePage: React.FC = () => {
  const [data, setData] = React.useState<AttendanceRecord[]>([]);
  const [lastUpdated, setLastUpdated] = React.useState<string>('');

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/getUserWorkScore?userId=673040614-4');
      const result = await response.json();
      setData(result.data);
      setLastUpdated(new Date().toLocaleString());
    };

    fetchData();
  }, []);

  const handleReportError = () => {
    alert('Error reporting triggered.');
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Work Score</h1>
      <p className="text-gray-600 mb-4">Last updated: {lastUpdated}</p>
      <WorkScoreTable data={data} />
      <ErrorReportButton onClick={handleReportError} />
    </Layout>
  );
};

export default WorkScorePage;
