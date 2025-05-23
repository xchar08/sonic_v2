// app/layout.tsx

"use client";

import { Inter } from 'next/font/google';
import '../styles/global.css';
import { useEffect } from 'react';
import gsap from 'gsap';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      gsap.fromTo(
        '.main-content',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}