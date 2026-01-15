
// pages/_app.js
import '@/styles/globals.css'
import { IBM_Plex_Sans_Thai } from 'next/font/google';

// ตั้งค่าฟอนต์
const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ['300', '400', '500', '600', '700'], // เลือกความหนาที่จะใช้
  subsets: ['thai', 'latin'], 
  variable: '--font-ibm', // ตั้งชื่อตัวแปรเผื่อใช้ใน Tailwind
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <main className={ibmPlexSansThai.className}>
      <Component {...pageProps} />
    </main>
  );
}