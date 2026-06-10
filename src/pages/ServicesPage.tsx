import React from 'react';
import { motion } from "motion/react";
import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom";
import { 
  ArrowLeft, 
  Droplets, 
  MicroscopeIcon, 
  FlaskConical, 
  HeartPulse, 
  Syringe, 
  Activity, 
  Gauge, 
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  Award,
  Menu,
  Share2,
  Search
} from "lucide-react";
import { LOCALIZATION } from '../localization';
import { AgilusLogo } from "../components/AgilusLogo";
import { useSEO } from "../hooks/useSEO";

const ServicesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useSEO({
    title: "Diagnostic Services | Pathology Lab Mohali Home Collection | SRL Diagnostics Sector 69",
    description: "Explore our comprehensive range of pathological tests, full body checkups, and diagnostic services at SRL Diagnostics Sector 69. Offering reliable home collection in Mohali.",
    canonicalUrl: "/services"
  });

  const services = [
    { 
      name: "Blood Test Home Collection", 
      icon: Droplets,
      desc: "Free hygienic sample collection at your doorstep in Mohali by certified phlebotomists.",
      color: "text-red-600 dark:text-red-400",
      bgClass: "bg-red-50 dark:bg-red-950/20"
    },
    { 
      name: "COVID-19 RT-PCR Test", 
      icon: MicroscopeIcon,
      desc: "Accredited molecular processing with reliable 12-hour digital report turnaround.",
      color: "text-indigo-600 dark:text-indigo-400",
      bgClass: "bg-indigo-50 dark:bg-indigo-950/20"
    },
    { 
      name: "Pathology Lab Services", 
      icon: FlaskConical,
      desc: "Advanced MNC-standard biochemistry, hematology, immunology and urine profiles.",
      color: "text-purple-600 dark:text-purple-400",
      bgClass: "bg-purple-50 dark:bg-purple-950/20"
    },
    { 
      name: "Full Body Checkup", 
      icon: HeartPulse,
      desc: "Comprehensive 92-parameter package covering kidney, liver, thyroid, and cardiac health.",
      color: "text-rose-600 dark:text-rose-400",
      bgClass: "bg-rose-50 dark:bg-rose-950/20"
    },
    { 
      name: "Vitamin D & B12 Screening", 
      icon: Syringe,
      desc: "Accurate micro-testing for deficiency indices with clear clinical interpretations.",
      color: "text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-emerald-50 dark:bg-emerald-950/20"
    },
    { 
      name: "Thyroid Function Tests", 
      icon: Activity,
      desc: "T3, T4, TSH assays to monitor metabolism, lethargy and overall endocrine function.",
      color: "text-amber-600 dark:text-amber-400",
      bgClass: "bg-amber-50 dark:bg-amber-950/20"
    },
    { 
      name: "Diabetes Management", 
      icon: Gauge,
      desc: "HbA1c & fasting blood sugar assays with dynamic historical trends and notes.",
      color: "text-cyan-600 dark:text-cyan-400",
      bgClass: "bg-cyan-50 dark:bg-cyan-950/20"
    },
    { 
      name: "Kidney Function Tests", 
      icon: Stethoscope,
      desc: "Creatinine, urea, uric acid levels testing supporting renal wellness evaluations.",
      color: "text-teal-600 dark:text-teal-400",
      bgClass: "bg-teal-50 dark:bg-teal-950/20"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="border-b border-gray-100 dark:border-zinc-800 pb-8 mb-12">
          <h1 className="text-4xl sm:text-5xl font-black mb-4 text-[#1a1c1e] dark:text-white tracking-tight">
            Our Diagnostic Services
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
            {LOCALIZATION.BRAND.NAME} Mohali offers a comprehensive suite of highly accredited clinical pathology services. Utilizing advanced MNC-standard diagnostic automation and robotic processes, we assure the highest level of laboratory precision and safety.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              onClick={() => navigate('/')}
              className="p-6 border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-[#1f2023] rounded-2xl shadow-sm hover:shadow-lg dark:hover:shadow-zinc-950/20 hover:border-google-blue/30 dark:hover:border-google-blue/40 transition-all duration-300 flex items-start gap-5 cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-xl ${service.bgClass} flex items-center justify-center shrink-0`}>
                <service.icon className={`w-6 h-6 ${service.color} transition-transform group-hover:scale-110 duration-300`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#1a1c1e] dark:text-white mb-1.5 flex items-center gap-1.5 group-hover:text-google-blue dark:group-hover:text-[#4da9ad] transition-colors">
                  {service.name}
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quality Badges Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 pt-10 border-t border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-zinc-800/30 p-5 rounded-2xl border border-gray-200/50 dark:border-zinc-800/40">
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950/20 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">NABL Accredited Facility</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 font-semibold">Meets world-class parameters of competence and reliability.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 dark:bg-zinc-800/30 p-5 rounded-2xl border border-gray-200/50 dark:border-zinc-800/40">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-google-blue dark:text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">MNC Precision Standards</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 font-semibold">Equipped with standard automated clinical robotics.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
