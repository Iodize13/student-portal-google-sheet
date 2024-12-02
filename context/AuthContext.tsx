import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isSignedIn: boolean;
  studentId: string | null;
  signin: (studentId: string) => void;
  signout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  studentId: null,
  signin: () => {},
  signout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('studentId');
    if (storedId) {
      setStudentId(storedId);
      setIsSignedIn(true); // Set signin state if studentId exists in localStorage
    }
  }, []);

  const signin = (id: string) => {
    localStorage.setItem('studentId', id);  // Store studentId in localStorage
    setStudentId(id);
    setIsSignedIn(true);
  };

  const signout = () => {
    localStorage.removeItem('studentId');
    setStudentId(null);
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, studentId, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
