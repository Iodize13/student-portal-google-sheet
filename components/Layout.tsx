import React, { useEffect, useContext, ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DarkModeToggle from './ui/DarkModeToggle';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isSignedIn, signout } = useContext(AuthContext);
  const router = useRouter();

  // Redirect users to signin if they are not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/signin');
    }
  }, [isSignedIn, router]);

  const handleSignout = () => {
    signout();
    router.push('/signin');
  };

  return (
      <div className="flex flex-col min-h-screen">
      <header className="border-b-2 bg-white dark:bg-gray-900 text-white p-2">
      <div className="container mx-auto flex justify-between items-center">
      <div className="text-orange-600 font-bold text-2xl md:text-3xl">Eng COE</div>
      <nav className="flex items-center space-x-4">
      <DarkModeToggle />
      {isSignedIn ? (
          <>
          <button
          onClick={handleSignout}
          className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition"
          >
          Sign out
          </button>
          </>
      ) : (
      <p className="text-slate-300">You are not signed in</p>
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
