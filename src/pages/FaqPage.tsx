import React from 'react';
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom";
import { 
  ArrowLeft, 
  MessageSquare, 
  ChevronDown,
  Menu,
  Share2,
  Search
} from "lucide-react";
import { LOCALIZATION } from '../localization';
import { AgilusLogo } from "../components/AgilusLogo";
import { useSEO } from "../hooks/useSEO";

const FaqPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  useSEO({
    title: "FAQ & Support | Pathology Lab Mohali Home Collection | SRL Diagnostics Sector 69",
    description: "Find answers to frequently asked questions about blood tests and home sample collection at SRL Diagnostics Sector 69, Mohali's premier pathology lab.",
    canonicalUrl: "/faq"
  });
  
  const faqs = [
    {
      q: "Is home sample collection free in Mohali?",
      a: `${LOCALIZATION.BRAND.NAME} offers complimentary home sample collection for residents in Sector 69, 70, 71, and all major phases of Mohali. Our trained phlebotomists follow strict hygiene protocols, and your samples are processed in our NABL-accredited facility to ensure accurate results.`
    },
    {
      q: "How soon can I get my lab reports?",
      a: "For routine tests like CBC, Lipid Profile, or Diabetes Screening, reports are typically delivered within 6-12 hours. Advanced molecular tests may take 24-48 hours. We deliver reports via WhatsApp, Email, and our secure online portal."
    },
    {
      q: "Are you an NABL accredited lab?",
      a: `Yes, our Mohali ${LOCALIZATION.BRAND.LOCATION} facility is NABL accredited. This means our laboratory meets high national and international standards for competence, impartiality, and consistent operation in clinical testing.`
    },
    {
      q: "Where is the lab located in Mohali?",
      a: `We are located at ${LOCALIZATION.CONTACT.ADDRESS}.`
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              {/* Official Agilus Logo */}
              <AgilusLogo className="h-8 md:h-12 w-auto cursor-pointer transition-all duration-200 hover:scale-[1.03]" />
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
        <div className="border-b border-gray-100 dark:border-zinc-800 pb-8 mb-10">
          <span className="bg-blue-50 dark:bg-blue-950/20 text-google-blue dark:text-blue-450 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block border border-blue-100 dark:border-zinc-700 mb-4">
            Patient Support
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 text-[#1a1c1e] dark:text-white tracking-tight">
            {LOCALIZATION.FAQ.TITLE}
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 font-semibold max-w-2xl leading-relaxed mt-1">
            Find answers to common questions about diagnostic tests, sample guidelines, and lab report turnarounds.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className="border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-[#1f2023] hover:border-google-blue/30 dark:hover:border-google-blue/30 transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left group transition-all"
                >
                  <span className="text-base sm:text-lg font-extrabold text-[#1a1c1e] dark:text-white group-hover:text-google-blue dark:group-hover:text-blue-450 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 dark:text-zinc-500 transition-all duration-300 shrink-0 ${isOpen ? "rotate-180 text-google-blue dark:text-blue-400" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden bg-gray-50/50 dark:bg-zinc-900/30 border-t border-gray-100 dark:border-zinc-800"
                    >
                      <p className="p-6 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
