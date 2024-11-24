// /lib/sheetService.test.js
import { fetchScoresAndAttendanceBasedOnStudentId } from './sheetService';
import { google } from 'googleapis';

// Mock Google Sheets API
jest.mock('googleapis', () => {
  return {
    google: {
      sheets: jest.fn().mockReturnThis(),
      spreadsheets: {
        values: {
          get: jest.fn()
        }
      }
    }
  };
});

describe('fetchScoresAndAttendanceBasedOnStudentId', () => {
  it('should return student data when data is found for a given studentId', async () => {
    const studentId = '12345';
    const mockData = [
      ['12345', 'Math', '90', 'Present'],
      ['12345', 'Science', '85', 'Present'],
    ];

    google.sheets().spreadsheets.values.get.mockResolvedValue({
      data: { values: mockData },
    });

    const result = await fetchScoresAndAttendanceBasedOnStudentId(studentId);

    expect(result).toEqual(mockData);
    expect(google.sheets().spreadsheets.values.get).toHaveBeenCalledWith({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A1:F100',
    });
  });

  it('should throw an error when no student data is found for the given studentId', async () => {
    const studentId = '12345';
    const mockData = [
      ['67890', 'Math', '90', 'Present'],
      ['67890', 'Science', '85', 'Present'],
    ];

    google.sheets().spreadsheets.values.get.mockResolvedValue({
      data: { values: mockData },
    });

    await expect(fetchScoresAndAttendanceBasedOnStudentId(studentId)).rejects.toThrowError(
      `No data found for student ID: ${studentId}`
    );
  });

  it('should throw an error when authentication fails', async () => {
    const studentId = '12345';
    google.sheets().spreadsheets.values.get.mockRejectedValue(new Error('Authentication failed'));

    await expect(fetchScoresAndAttendanceBasedOnStudentId(studentId)).rejects.toThrowError(
      'Authentication failed'
    );
  });
});
