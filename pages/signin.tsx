import { useState, useContext } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';  // Access the login function from context
import { useRouter } from 'next/router';

export default function SigninPage() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { signin } = useContext(AuthContext);  // Access the login function from context
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!studentId || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sign in successful, studentId:', studentId); // Log on successful login
        signin(studentId);  // Update the AuthContext with the studentId

        // Now redirect to /work-score or any other page you want after login
        router.push('/dashboard');  // Redirect directly to work-score after login
      } else {
        setError(data.message || 'Sign in failed');
      }
    } catch (err) {
      setError('An error occurred during sign in');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center text-black items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full sm:w-96">
        <h1 className="text-2xl font-bold text-center text-black mb-4">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Student ID</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-2 pr-10 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition"
          >
            Sign in
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">Don't have an account?</p>
          <a
            href="/register"
            className="text-orange-600 font-medium hover:underline"
          >
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}
