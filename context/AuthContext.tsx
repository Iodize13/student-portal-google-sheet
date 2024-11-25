import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  studentId: string | null;
  login: (studentId: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  studentId: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('studentId');
    if (storedId) {
      setStudentId(storedId);
      setIsLoggedIn(true); // Set login state if studentId exists in localStorage
    }
  }, []);

  const login = (id: string) => {
    localStorage.setItem('studentId', id);  // Store studentId in localStorage
    setStudentId(id);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('studentId');
    setStudentId(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, studentId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
