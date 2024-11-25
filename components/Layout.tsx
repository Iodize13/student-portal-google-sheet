import React, { useEffect, useContext, ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const router = useRouter();

  // Redirect users to login if they are not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
      <div className="flex flex-col min-h-screen">
      <header className="border-b-2 bg-white text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
      <div className="text-custom-orange font-bold text-4xl">Eng COE</div>
      <nav className="flex items-center space-x-4">
      {isLoggedIn ? (
          <>
          <a href="/work-score" className="text-black hover:text-slate-400">Work Score</a>
          <a href="/attendance" className="text-black hover:text-slate-400">Attendance</a>
          <button
          onClick={handleLogout}
          className="bg-custom-orange text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
          >
          Logout
          </button>
          </>
      ) : (
      <p className="text-slate-300">You are not logged in</p>
      )}
      </nav>
      </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
      {children}
      </main>
      </div>
  );
};

export default Layout;
