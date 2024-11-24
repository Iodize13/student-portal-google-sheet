import Image from "next/image";
import localFont from "next/font/local";
import MyComponent from '../components/MyComponent';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const studentId = '673040640-3'; // You can dynamically generate this if needed

  return (
    <div>
      <MyComponent studentId={studentId} />
    </div>
  );
}
