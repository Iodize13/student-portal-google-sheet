// /lib/sheetService.js

import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const authenticate = async () => {
  try {
    console.log('Authenticating with Google Sheets API...');
    const authClient = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, // Service account email
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Private key
      SCOPES
    );
    await authClient.authorize();
    console.log('Google Sheets API authentication successful');
    return google.sheets({ version: 'v4', auth: authClient });
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Authentication failed');
  }
};

const fetchScoresAndAttendanceBasedOnStudentId = async (studentId) => {
  try {
    if (!studentId) {
      console.log('No studentId provided to fetchScoresAndAttendanceBasedOnStudentId.');
      throw new Error('Student ID is required');
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Sheet1!A1:F100';

    console.log(`Fetching data for student ID ${studentId} from sheet ID: ${sheetId}`);
    const sheets = await authenticate();

    console.log('Fetching data from Google Sheets...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: range,
    });

    const rows = response.data.values;
    console.log('Data fetched from Google Sheets:', rows);

    if (!rows || rows.length === 0) {
      console.log('No rows found in the Google Sheet');
      throw new Error('No data found in the sheet');
    }

    const studentData = rows.filter(row => row[0] === studentId); // Assuming student ID is in the first column
    console.log('Filtered student data:', studentData);

    if (studentData.length === 0) {
      console.log(`No data found for student ID: ${studentId}`);
      throw new Error(`No data found for student ID: ${studentId}`);
    }

    return studentData;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw new Error(error.message || 'Error fetching student data');
  }
};

export { fetchScoresAndAttendanceBasedOnStudentId };
