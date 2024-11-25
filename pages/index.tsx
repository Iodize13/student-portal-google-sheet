import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  // Check for authentication cookie or session token
  const isLoggedIn = req.cookies.token; // Replace `token` with your actual auth cookie key

  if (!isLoggedIn) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false, // Not a permanent redirect, so it allows users to login and return
      },
    };
  }

  // If logged in, render the home page
  return {
    props: {}, // Pass any data as props here if needed
  };
};

export default function Home() {
  return <h1>Welcome to the Home Page!</h1>;
}
