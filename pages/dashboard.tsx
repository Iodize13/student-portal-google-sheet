import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';
import WorkScoreTable from '../components/WorkScoreTable';
import ErrorReportButton from '../components/ErrorReportButton';
import { useRouter } from 'next/router';

type AttendanceRecord = {
  date: string;
  status: 'Present' | 'Late' | 'Absent' | 'Unknown';
};

const WorkScorePage: React.FC = () => {
  const { isLoggedIn, studentId, logout } = useContext(AuthContext);
  const [data, setData] = useState<AttendanceRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn || !studentId) {
      router.push('/login'); // Redirect to login if not logged in or studentId is not set
      return;
    }

    // Fetch data if studentId is available
    const fetchData = async () => {
      if (!studentId) {
        setError('Student ID not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/getStudentScores?studentId=${studentId}`);
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || 'Failed to fetch data');
        }

        setData(result);
      } catch (err: any) {
        console.error('Error fetching data:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn, studentId, router]);  // Dependencies: re-run if login state or studentId changes

  const handleReportError = () => {
    alert('Error reporting triggered.');
  };

  // Show loading state while waiting for data
  if (!data.length && !error) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Work Score</h1>
        <p className="text-gray-600 mb-4">Loading...</p>
      </Layout>
    );
  }

  // Show error if there was an issue fetching data
  if (error) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Work Score</h1>
        <p className="text-red-500 mb-4">{error}</p>
      </Layout>
    );
  }

  return (
    <Layout>

      <h1 className="text-2xl font-bold mb-4">Work Score</h1>
{data.map((item, index) => (
      <p className="text-gray-600 mb-4">{item[1]} {item[2]}</p>
))}
      <WorkScoreTable data={data} />
    </Layout>
  );
};

export default WorkScorePage;
