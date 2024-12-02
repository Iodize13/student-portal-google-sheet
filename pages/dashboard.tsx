import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';
import AttendanceTable from '../components/AttendanceTable';
import ErrorReportButton from '../components/ErrorReportButton';
import { useRouter } from 'next/router';
import Dashboard from '../components/Dashboard';
import WorkScoreTable from '../components/WorkScoreTable';
import ThemeProvider from '../components/ThemeProvider';

type AttendanceRecord = {
  date: string;
  status: 'Present' | 'Late' | 'Absent' | 'Unknown';
};

const WorkScorePage: React.FC = () => {
  const { isSignedIn, studentId, logout } = useContext(AuthContext);
  const [data, setData] = useState<AttendanceRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();
  useEffect(() => {

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
    // Check if user is logged in
    if (!isSignedIn || !studentId) {
      router.push('/signin'); // Redirect to login if not logged in or studentId is not set
      return;
    }

    fetchData();
  }, [isSignedIn, studentId, router]);  // Dependencies: re-run if login state or studentId changes

  const handleReportError = () => {
    alert('Error reporting triggered.');
  };

  // Show loading state while waiting for data
  if (!data.attendance || !data.attendance.length && !error) {
    return (
      <Layout>
        <p className="text-slate-600 mb-4 text-center">Loading...</p>
      </Layout>
    );
  }

  // Show error if there was an issue fetching data
  if (error) {
    return (
      <Layout>
        <p className="text-red-500 mb-4 text-center">{error}</p>
      </Layout>
    );
  }

  return (
  <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
    <Layout>
        <TabGroup>
          <TabList className="flex gap-4 justify-center">
              <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-slate-500 focus:outline-none data-[selected]:bg-slate-200 data-[selected]:text-slate-800 data-[hover]:text-slate-800 data-[selected]:data-[hover]:bg-slate-200 data-[focus]:outline-1 data-[focus]:outline-black"
              >Attendance
              </Tab>
              <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-slate-500 focus:outline-none data-[selected]:bg-slate-200 data-[selected]:text-slate-800 data-[hover]:text-slate-800 data-[selected]:data-[hover]:bg-slate-200 data-[focus]:outline-1 data-[focus]:outline-black"
              >Work Score
              </Tab>
          </TabList>
          <TabPanels className="mt-3">
              <TabPanel className="rounded-xl bg-white/5 p-3">
{data.attendance.map((item, index) => (
      <p className="text-slate-600 mb-3 text-center">{item[1]} {item[2]}</p>
))}
      <AttendanceTable attendance={data.attendance} dates={data.dates} />
              </TabPanel>
              <TabPanel className="rounded-xl bg-white/5 p-3">
{data.attendance.map((item, index) => (
      <p className="text-slate-600 mb-3 text-center">{item[1]} {item[2]}</p>
))}
      <WorkScoreTable data={data.scores} />
              </TabPanel>
          </TabPanels>
        </TabGroup>
    </Layout>
    </ThemeProvider>
  );
};

export default WorkScorePage;
