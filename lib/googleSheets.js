import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const KEYFILEPATH = path.join(process.cwd(), 'credentials.json'); // Update this path

const auth = new google.auth.GoogleAuth({
 keyFile: KEYFILEPATH,
 scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

export const getSheetData = async (spreadsheetId, range) => {
 try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
 } catch (error) {
    console.error('Error reading data from Google Sheets:', error);
    throw new Error('Failed to read data from Google Sheets');
 }
};
