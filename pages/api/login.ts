// pages/api/login.ts
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserByEmail } from '../../lib/db';

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Get user from database
    getUserByEmail(email, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare password with hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          // Normally, you would set a session or JWT token here
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      });
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

