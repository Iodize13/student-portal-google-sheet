// /pages/api/getStudentScores.js

import { fetchScoresAndAttendanceBasedOnStudentId } from '../../lib/sheetService';

export default async function handler(req, res) {
  const { studentId } = req.query;

  if (!studentId) {
    return res.status(400).json({ error: 'Student ID is required' });
  }

  try {
    console.log(`Fetching data for student ID: ${studentId}`);  // Log student ID

    const data = await fetchScoresAndAttendanceBasedOnStudentId(studentId);
    console.log('Fetched data:', data);  // Log the fetched data

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No data found for this student ID' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching student data:', error);  // Log the error
    res.status(500).json({ error: 'Error fetching student data' });
  }
}
