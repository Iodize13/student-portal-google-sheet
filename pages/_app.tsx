// pages/_app.tsx
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import '../styles/globals.css'; // Ensure you have global styles

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { isSignedIn } = useContext(AuthContext);

  useEffect(() => {
    const publicPaths = ['/signin', '/register'];
    const path = router.pathname;

    // If the user is not signed in and trying to access a protected path, redirect to /signin
    if (!isSignedIn && !publicPaths.includes(path)) {
      router.push('/signin');
    } 
    // If the user is signed in and trying to access /signin, redirect to /dashboard
    else if (isSignedIn && path === '/signin') {
      router.push('/dashboard');
    }
    // If the user is signed in and trying to access /dashboard, no redirect needed
    // (It would already be at /dashboard, so no need to reroute)
  }, [isSignedIn, router]);

  return <Component {...pageProps} />;
}

export default function AppWrapper(props) {
  return (
    <AuthProvider>
      <MyApp {...props} />
    </AuthProvider>
  );
}
