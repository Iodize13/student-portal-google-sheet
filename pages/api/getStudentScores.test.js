import request from 'supertest';
import next from 'next';
import { fetchScoresAndAttendanceBasedOnStudentId } from '../../lib/sheetService';

// Mock the sheetService function
jest.mock('../../lib/sheetService', () => ({
  fetchScoresAndAttendanceBasedOnStudentId: jest.fn(),
}));

// Setup the Next.js server for testing
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

beforeAll(async () => {
  await app.prepare();
});

describe('/api/getStudentScores', () => {
  it('should return 200 and student data when studentId is valid', async () => {
    const mockData = [
      ['12345', 'Math', '90', 'Present'],
      ['12345', 'Science', '85', 'Present'],
    ];

    // Mock the function to return the mock data
    fetchScoresAndAttendanceBasedOnStudentId.mockResolvedValue(mockData);

    await request(app.getRequestHandler())
      .get('/api/getStudentScores?studentId=12345')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(mockData);
      });
  });

  it('should return 400 when studentId is missing', async () => {
    await request(app.getRequestHandler())
      .get('/api/getStudentScores')
      .expect(400)
      .then((response) => {
        expect(response.body.error).toBe('Student ID is required');
      });
  });

  it('should return 404 when no data is found for the studentId', async () => {
    // Mock no data found
    fetchScoresAndAttendanceBasedOnStudentId.mockResolvedValue([]);

    await request(app.getRequestHandler())
      .get('/api/getStudentScores?studentId=12345')
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe('No data found for this student ID');
      });
  });

  it('should return 500 on internal error', async () => {
    // Mock internal server error
    fetchScoresAndAttendanceBasedOnStudentId.mockRejectedValue(new Error('Internal error'));

    await request(app.getRequestHandler())
      .get('/api/getStudentScores?studentId=12345')
      .expect(500)
      .then((response) => {
        expect(response.body.error).toBe('Error fetching student data: Internal error');
      });
  });
});
