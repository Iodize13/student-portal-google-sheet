import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUserByStudentId } from '../../lib/db';

export default async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Log incoming data to ensure it's being received correctly
    console.log('Request body:', req.body);

    const { studentId, email, password, confirmPassword } = req.body;

    // Validate inputs
    if (!studentId || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
      // Check if studentId already exists
      getUserByStudentId(studentId, (err, existingUser) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (existingUser) {
          return res.status(400).json({ message: 'Student ID already exists' });
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error('Bcrypt error:', err);
            return res.status(500).json({ message: 'Error hashing password' });
          }

          // Save user to the database
          createUser(studentId, email, hashedPassword, (err, userId) => {
            if (err) {
              console.error('Database error during user creation:', err);
              return res.status(500).json({ message: 'Error saving user' });
            }

            // Send successful response with user ID
            return res.status(201).json({ message: 'User registered successfully', userId });
          });
        });
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
