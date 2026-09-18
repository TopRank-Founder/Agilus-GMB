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

// Custom interactive, non-blocking toast overlay to replace default window.alert
if (typeof window !== "undefined") {
  window.alert = (message: string) => {
    let container = document.getElementById("custom-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "custom-toast-container";
      container.className = "fixed bottom-24 sm:bottom-6 left-1/2 -translate-x-1/2 z-[10000] flex flex-col gap-2 w-full max-w-xs px-4 pointer-events-none";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "bg-zinc-900/95 backdrop-blur-md border border-zinc-800 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-3 text-xs font-semibold tracking-wide transform translate-y-10 opacity-0 transition-all duration-300 pointer-events-auto select-none";
    
    const iconContainer = document.createElement("div");
    iconContainer.className = "w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0";
    iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
    
    const msgSpan = document.createElement("span");
    msgSpan.className = "flex-1 text-zinc-100 font-medium leading-normal";
    msgSpan.textContent = message;

    toast.appendChild(iconContainer);
    toast.appendChild(msgSpan);
    container.appendChild(toast);

    setTimeout(() => {
      toast.className = "bg-zinc-900/95 backdrop-blur-md border border-zinc-800 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-3 text-xs font-semibold tracking-wide transform translate-y-0 opacity-100 transition-all duration-300 pointer-events-auto select-none";
    }, 10);

    setTimeout(() => {
      toast.className = "bg-zinc-900/95 backdrop-blur-md border border-zinc-800 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-3 text-xs font-semibold tracking-wide transform translate-y-2 opacity-0 transition-all duration-300 pointer-events-auto select-none";
      setTimeout(() => {
        toast.remove();
        const updatedContainer = document.getElementById("custom-toast-container");
        if (updatedContainer && updatedContainer.childNodes.length === 0) {
          updatedContainer.remove();
        }
      }, 300);
    }, 3000);
  };
}

const TestDetailPage = lazy(() => import('./pages/TestDetailPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const HomeCollectionPage = lazy(() => import('./pages/HomeCollectionPage'));

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
          <Route path="/home-collection" element={<HomeCollectionPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
