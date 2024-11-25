// pages/_app.tsx
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import '../styles/globals.css'; // Ensure you have global styles

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const publicPaths = ['/login', '/register'];
    const path = router.pathname;

    if (!isLoggedIn && !publicPaths.includes(path)) {
      router.push('/login');
    } else if (isLoggedIn && path === '/login') {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  return <Component {...pageProps} />;
}

export default function AppWrapper(props) {
  return (
    <AuthProvider>
      <MyApp {...props} />
    </AuthProvider>
  );
}
