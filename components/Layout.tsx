import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-lg">LOGO</div>
          <nav>
            <a href="/work-score" className="text-gray-300 hover:text-white mx-2">
              Work Score
            </a>
            <a href="/attendance" className="text-gray-300 hover:text-white mx-2">
              Attendance
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-gray-400 text-center p-4">
        <p>© 2024 All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
