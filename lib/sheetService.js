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
    const attendanceRange = `'Class att'!A1:X50`;
    const scoresRange = `'score'!A1:L50`;

    // Log removed for production
    const sheets = await authenticate();

    // Fetch attendance data
    const attendanceResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: attendanceRange,
    });
    const attendanceRows = attendanceResponse.data.values;

    if (!attendanceRows || attendanceRows.length === 0) {
      throw new Error('No data found in the attendance sheet');
    }

    // Fetch score data
    const scoresResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: scoresRange,
    });
    const scoreRows = scoresResponse.data.values;

    if (!scoreRows || scoreRows.length === 0) {
      throw new Error('No data found in the score sheet');
    }

    // Filter attendance data by studentId (assuming it's in column 1 of attendance sheet)
    const studentAttendance = attendanceRows.filter(row => row[1] === studentId);

    if (studentAttendance.length === 0) {
      throw new Error(`No attendance data found for student ID: ${studentId}`);
    }

    // Filter score data by studentId (assuming it's in column 1 of the score sheet)
    const studentScores = scoreRows.filter(row => row[1] === studentId);

    if (studentScores.length === 0) {
      throw new Error(`No score data found for student ID: ${studentId}`);
    }

    const datesFromSheet = attendanceResponse.data.values[2];

    // Combine both attendance and score data based on studentId
    const studentData = {
      attendance: studentAttendance,
      scores: studentScores,
        dates: datesFromSheet,
    };

    return studentData;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error); // Retaining error logging
    throw new Error(error.message || 'Error fetching student data');
  }
};

export { fetchScoresAndAttendanceBasedOnStudentId };
