import {StrictMode, lazy, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Self-Hosted Fonts (eliminates Google Fonts latency chains and external preconnects)
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";

import App from './App.tsx';
import './index.css';

const TestDetailPage = lazy(() => import('./pages/TestDetailPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans text-[#202124]">
          <div className="flex flex-col items-center gap-6 max-w-xs px-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping"></div>
              <svg className="w-10 h-10 text-google-blue animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div className="text-center font-bold text-sm tracking-wide text-google-grey/80">Loading...</div>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/tests/:testName" element={<TestDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
