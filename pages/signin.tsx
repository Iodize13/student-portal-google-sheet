import { useState, useContext } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';  // Access the login function from context
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);  // Access the login function from context
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!studentId || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful, studentId:', studentId); // Log on successful login
        login(studentId);  // Update the AuthContext with the studentId

        // Now redirect to /work-score or any other page you want after login
        router.push('/work-score');  // Redirect directly to work-score after login
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Student ID</label>
            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-2 pr-10 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-custom-orange text-white p-2 rounded-lg hover:bg-orange-700 transition"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">Don't have an account?</p>
          <a
            href="/register"
            className="text-custom-orange font-medium hover:underline"
          >
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}
