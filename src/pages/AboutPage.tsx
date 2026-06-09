import React from 'react';
import { motion } from "motion/react";
import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom";
import { 
  ArrowLeft, 
  Award, 
  ShieldCheck, 
  Heart,
  Menu,
  Share2,
  Search
} from "lucide-react";
import { LOCALIZATION } from '../localization';
import agilusLogo from "../assets/images/agilusLogo.png";

const AboutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    document.title = "About Agilus Diagnostics (formerly SRL Diagnostics) Mohali";
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#121314] font-sans pb-16 transition-colors duration-300">
      {/* Modern Cinematic Header (Sticky top-0) */}
      <header className="sticky top-0 z-[60] w-full bg-white/95 dark:bg-[#121314]/95 backdrop-blur-md border-b border-gray-200/80 dark:border-zinc-800/80 px-4 sm:px-[24px] h-16 md:h-20 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* Back button on mobile/tablet */}
            <button
              onClick={() => navigate('/')}
              className="lg:hidden p-2 rounded-full bg-gray-50 dark:bg-zinc-800 text-google-blue dark:text-blue-400 hover:bg-gray-150 transition-all cursor-pointer border-0"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Menu
              aria-label="Menu"
              className="hidden lg:block w-8 h-8 text-google-grey cursor-pointer hover:bg-google-light-grey rounded-full p-1.5 flex-shrink-0"
            />
            <RouterLink
              to="/"
              className="flex items-center gap-2 hover:opacity-85 active:scale-95 transition-all duration-200 overflow-hidden flex-shrink-0 select-none cursor-pointer"
            >
              {/* Official Agilus Logo Image */}
              <img
                src={agilusLogo}
                alt="Agilus Diagnostics"
                width={150}
                height={48}
                className="h-8 md:h-12 w-auto object-contain flex-shrink-0 cursor-pointer transition-all duration-200 hover:scale-[1.03]"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </RouterLink>
          </div>

          {/* Premium Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 mx-4 shrink-0" aria-label="Main Navigation">
            <RouterLink
              to="/"
              className={`text-[13px] xl:text-sm font-bold tracking-tight transition-all duration-155 hover:text-google-blue relative py-1.5 ${location.pathname === '/' ? 'text-google-blue border-b-2 border-google-blue' : 'text-google-grey dark:text-gray-300'}`}
            >
              Overview
            </RouterLink>
            <RouterLink
              to="/services"
              className={`text-[13px] xl:text-sm font-bold tracking-tight transition-all duration-155 hover:text-google-blue relative py-1.5 ${location.pathname === '/services' ? 'text-google-blue border-b-2 border-google-blue' : 'text-google-grey dark:text-gray-300'}`}
            >
              Our Services
            </RouterLink>
            <RouterLink
              to="/about"
              className={`text-[13px] xl:text-sm font-bold tracking-tight transition-all duration-155 hover:text-google-blue relative py-1.5 ${location.pathname === '/about' ? 'text-google-blue border-b-2 border-google-blue' : 'text-google-grey dark:text-gray-300'}`}
            >
              About Lab
            </RouterLink>
            <RouterLink
              to="/faq"
              className={`text-[13px] xl:text-sm font-bold tracking-tight transition-all duration-155 hover:text-google-blue relative py-1.5 ${location.pathname === '/faq' ? 'text-google-blue border-b-2 border-google-blue' : 'text-google-grey dark:text-gray-300'}`}
            >
              FAQs
            </RouterLink>
            <RouterLink
              to="/booking"
              className={`text-[13px] xl:text-sm font-bold tracking-tight transition-all duration-155 hover:text-google-blue relative py-1.5 ${location.pathname === '/booking' ? 'text-google-blue border-b-2 border-google-blue' : 'text-google-grey dark:text-gray-300'}`}
            >
              Book Home Collection
            </RouterLink>
          </nav>

          <div 
            className="hidden md:flex flex-1 max-w-xs xl:max-w-sm items-center bg-google-light-grey dark:bg-zinc-850 rounded-full px-4 py-2 border border-transparent focus-within:border-google-blue/30 focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:shadow-sm transition-all cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <Search className="w-4 h-4 text-google-grey dark:text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              readOnly
              placeholder="Search Tests or Services..."
              className="bg-transparent border-none outline-none w-full text-xs placeholder:text-google-grey dark:placeholder:text-gray-400 cursor-pointer pointer-events-none"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: document.title,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="hidden md:flex p-2.5 rounded-full hover:bg-google-light-grey dark:hover:bg-zinc-800 text-google-grey dark:text-gray-350 transition-colors cursor-pointer border-0 bg-transparent"
              aria-label="Share this app"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/booking')}
              className="px-4 md:px-5 py-2 md:py-2.5 bg-google-blue text-white rounded-full text-[13px] md:text-sm font-bold hover:bg-google-blue/90 shadow-sm whitespace-nowrap cursor-pointer transition-all active:scale-[0.98]"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-gray-100 dark:border-zinc-800 pb-8 mb-8"
        >
          <span className="bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block border border-orange-100 dark:border-orange-900/30 mb-4">
            Established Trust
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 text-[#1a1c1e] dark:text-white tracking-tight">
            About {LOCALIZATION.BRAND.NAME} Mohali
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-medium"
        >
          <p>
            {LOCALIZATION.BRAND.NAME} ({LOCALIZATION.BRAND.SUBBRAND.toUpperCase()}) in Mohali {LOCALIZATION.BRAND.LOCATION} is proud to be part of India’s premier laboratory and diagnostics network. We bring high-end international diagnostic procedures to the Mohali community, emphasizing perfect reporting precision.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="p-6 bg-gray-50 dark:bg-zinc-800/40 rounded-2xl border border-gray-200/50 dark:border-zinc-800 flex items-start gap-5 hover:border-google-blue/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/20 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-gray-900 dark:text-white mb-1">NABL Accredited Facility</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Strict adherence to highest quality, precision protocols, and patient safety criteria.</p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-zinc-800/40 rounded-2xl border border-gray-200/50 dark:border-zinc-800 flex items-start gap-5 hover:border-google-blue/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-google-blue dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-gray-900 dark:text-white mb-1 font-display">MNC Precision Standards</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Highly automated biochemical sample handling systems eliminate potential manual errors.</p>
              </div>
            </div>
          </div>

          <div className="border border-google-blue/10 dark:border-google-blue/20 bg-google-blue/[0.02] p-6 rounded-3xl flex gap-4">
            <Heart className="w-6 h-6 text-google-blue shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold italic">
              "Our diagnostic services are customized around safety and convenience. Starting with seamless home collection to real-time report availability on mobile, we care for you like family."
            </p>
          </div>

          <p>
            Our Mohali team of medical phlebotomists is trained strictly to provide the most comfortable and safe diagnostics. Feel secure booking blood draws and full health packages from the comfort of your home with {LOCALIZATION.BRAND.NAME} Mohali.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
