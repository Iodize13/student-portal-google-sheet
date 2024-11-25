// /lib/sheetService.js

import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const authenticate = async () => {
  try {
    // Log removed for production
    const authClient = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, // Service account email
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Private key (replace \\n with actual newline)
      SCOPES // Scopes required for the Sheets API
    );
    
    // Authenticate and create a client for the Sheets API
    await authClient.authorize();
    return google.sheets({ version: 'v4', auth: authClient });
  } catch (error) {
    console.error('Authentication error:', error); // Retaining error logging
    throw new Error('Authentication failed');
  }
};

const fetchScoresAndAttendanceBasedOnStudentId = async (studentId) => {
  try {
    if (!studentId) {
      throw new Error('Student ID is required');
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const range = `'Class att'!A1:X47`;

    // Log removed for production
    const sheets = await authenticate();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      throw new Error('No data found in the sheet');
    }

    const studentData = rows.filter(row => row[1] === studentId); // Assuming student ID is in the first column

    if (studentData.length === 0) {
      throw new Error(`No data found for student ID: ${studentId}`);
    }

    return studentData;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error); // Retaining error logging
    throw new Error(error.message || 'Error fetching student data');
  }
};

export { fetchScoresAndAttendanceBasedOnStudentId };
