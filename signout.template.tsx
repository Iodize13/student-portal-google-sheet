// pages/dashboard.tsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const StudentScores = () => {
  const { isLoggedIn, studentId, logout } = useContext(AuthContext);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
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
  }, [studentId, isLoggedIn, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Show loading state while waiting for data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  // Show error message if any
  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
      <Layout>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Scores and Attendance</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-4 py-2">Student ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Class 1</th>
              <th className="border border-gray-300 px-4 py-2">Class 2</th>
              {/* Add more headers as needed */}
              <th className="border border-gray-300 px-4 py-2">Absent Counts</th>
              <th className="border border-gray-300 px-4 py-2">Attendance Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-300 px-4 py-2">{item[1]}</td>
                <td className="border border-gray-300 px-4 py-2">{item[2]}</td>
                <td className="border border-gray-300 px-4 py-2">{item[4]}</td>
                <td className="border border-gray-300 px-4 py-2">{item[5]}</td>
                <td className="border border-gray-300 px-4 py-2">{item[19]}</td>
                <td className="border border-gray-300 px-4 py-2">{item[20]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
};

export default StudentScores;
