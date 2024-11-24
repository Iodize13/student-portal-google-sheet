// pages/api/login.ts
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserByStudentId } from '../../lib/db';

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { studentId, password } = req.body;

    // Validate inputs
    if (!studentId || !password) {
      return res.status(400).json({ message: 'Both fields are required' });
    }

    try {
      // Check if user exists by studentId
      getUserByStudentId(studentId, (err, user) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (!user) {
          return res.status(401).json({ message: 'Invalid student ID or password' });
        }

        // Compare the password with the hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.error('Bcrypt error:', err);
            return res.status(500).json({ message: 'Error comparing password' });
          }

          if (!isMatch) {
            return res.status(401).json({ message: 'Invalid student ID or password' });
          }

          // If match, login success
          return res.status(200).json({ message: 'Login successful' });
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
