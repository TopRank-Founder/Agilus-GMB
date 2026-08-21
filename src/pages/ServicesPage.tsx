import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
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
  Search,
  CheckCircle2,
  X,
  MessageCircle,
  Award as StarIcon,
  Info,
  Shield,
} from "lucide-react";
import { LOCALIZATION } from '../localization';
import { AgilusLogo } from "../components/AgilusLogo";
import { useSEO } from "../hooks/useSEO";
import { LAB_WELLNESS_PACKAGES, WellnessPackage } from "../data/wellnessPackages";

const ServicesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPackage, setSelectedPackage] = useState<WellnessPackage | null>(null);
  const [inclusionsGender, setInclusionsGender] = useState<"men" | "women">("men");

  useSEO({
    title: "Diagnostic Services & Blood Tests | SRL Diagnostics Mohali",
    description: "Explore our comprehensive range of blood tests and packages at SRL Diagnostics Mohali. Accurate medical diagnostics with convenient home sample pickup.",
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

        {/* Fullbody Health Packages Section */}
        <section className="mt-16 pt-12 border-t border-gray-100 dark:border-zinc-850" id="health-packages">
          <div className="mb-8">
            <span className="text-[11px] font-black tracking-widest uppercase text-google-blue dark:text-blue-400 bg-google-blue/5 dark:bg-blue-950/20 px-3 py-1.5 rounded-full border border-google-blue/10 dark:border-blue-950/30">
              NABL ACCREDITED • EXECUTIVE SCREENINGS
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#1a1c1e] dark:text-white font-black tracking-tight mt-3 mb-3">
              Fullbody Health Packages
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Tailored checkups monitoring up to 107 parameters with MNC-standard diagnostics automation. Includes vitamins, liver-kidney functions, cardiac lipid grids, and gender-specific hormone indexes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {LAB_WELLNESS_PACKAGES.map((pkg) => {
              const IconComp = pkg.icon;
              return (
                <div 
                  key={pkg.id} 
                  className="flex flex-col border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-[#1f2023] rounded-3xl overflow-hidden hover:shadow-xl dark:hover:shadow-zinc-950/20 hover:border-google-blue/30 dark:hover:border-google-blue/40 transition-all duration-300 pointer-events-auto"
                >
                  {/* Top Gradient Banner */}
                  <div className={`p-5 ${pkg.bgClass} relative select-none flex flex-col justify-between h-40`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md border ${pkg.badgeBg} ${pkg.badgeText} shadow-sm`}>
                        {pkg.parameters}
                      </span>
                      <div className="p-2 rounded-xl bg-white/70 backdrop-blur-md shadow-sm border border-white/30 text-gray-800">
                        <IconComp className={`w-5 h-5 ${pkg.textColorClass}`} />
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-base font-extrabold tracking-tight ${pkg.textColorClass} mb-1 leading-snug`}>
                        {pkg.title}
                      </h3>
                      <p className={`text-[11px] font-semibold leading-relaxed opacity-90 line-clamp-2 ${pkg.textColorClass}`}>
                        {pkg.sub}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Bottom Action Area */}
                    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800/80 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-wider">Mohali Price</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs font-bold text-gray-400 line-through">₹{(parseInt(pkg.priceText) * 2).toLocaleString()}</span>
                          <span className="text-xl font-extrabold text-[#1a1c1e] dark:text-white">₹{parseInt(pkg.priceText).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => {
                            setSelectedPackage(pkg);
                            setInclusionsGender("men");
                          }}
                          className="w-full h-10 rounded-full border border-gray-200 dark:border-zinc-700 hover:border-google-blue dark:hover:border-google-blue text-[11px] font-bold text-[#1a1c1e] dark:text-white dark:hover:text-[#4da9ad] hover:text-google-blue bg-transparent transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Info className="w-3.5 h-3.5 animate-pulse" /> Inclusions
                        </button>
                        <button
                          onClick={() => {
                            const text = `Hi, I would like to book the "${pkg.title}" diagnostic fullbody package (₹${pkg.priceText}) at SRL Diagnostics Mohali. Please confirm available slots.`;
                            window.open(`https://wa.me/919115459115?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
                          }}
                          className="w-full h-10 rounded-full bg-google-blue text-white hover:bg-google-blue/90 text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Modal Overlay for Package Inclusions details */}
        <AnimatePresence>
          {selectedPackage && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              {/* Backdrop blur element */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPackage(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#1f2023] border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-6 md:p-8 z-10 scrollbar-thin outline-none"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400 cursor-pointer border-0 transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header Banner Area */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md bg-google-blue/10 text-google-blue border border-google-blue/15 shadow-sm">
                      {selectedPackage.parameters}
                    </span>
                    <span className="text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                      NABL APPROVED QUALITY
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-2">
                    {selectedPackage.title}
                  </h3>

                  <div className="p-4 bg-gray-50 dark:bg-zinc-800/30 rounded-2xl border border-gray-100 dark:border-zinc-800/55 text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    {selectedPackage.desc}
                  </div>
                </div>

                {/* Gender Specific Section */}
                {(selectedPackage.menSpecial || selectedPackage.womenSpecial) && (
                  <div className="mb-6 p-4 bg-indigo-50/40 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100/60 dark:border-indigo-950/30">
                    <div className="flex items-center justify-between mb-3 border-b border-indigo-100 dark:border-indigo-900/30 pb-2 flex-wrap gap-2">
                      <span className="text-[10px] font-black uppercase text-indigo-700 dark:text-indigo-400 tracking-wider flex items-center gap-1.5">
                        <Shield className="w-4 h-4" /> Gender Specialized Wellness Markers
                      </span>
                      <div className="flex gap-1 bg-indigo-100/30 dark:bg-indigo-950/40 p-0.5 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                        <button
                          onClick={() => setInclusionsGender("men")}
                          className={`px-3 py-1 text-[10px] font-extrabold rounded-md cursor-pointer transition-all border-0 ${
                            inclusionsGender === "men"
                              ? "bg-indigo-600 text-white shadow-sm"
                              : "text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100/40 dark:hover:bg-indigo-950/30"
                          }`}
                        >
                          Men Specifics
                        </button>
                        <button
                          onClick={() => setInclusionsGender("women")}
                          className={`px-3 py-1 text-[10px] font-extrabold rounded-md cursor-pointer transition-all border-0 ${
                            inclusionsGender === "women"
                              ? "bg-rose-600 text-white shadow-sm"
                              : "text-rose-600 dark:text-rose-400 hover:bg-rose-100/40 dark:hover:bg-rose-950/30"
                          }`}
                        >
                          Women Specifics
                        </button>
                      </div>
                    </div>

                    <p className="text-xs font-semibold leading-relaxed text-gray-700 dark:text-gray-300">
                      {inclusionsGender === "men" 
                        ? selectedPackage.menSpecial || "PSA Test Panel - Included and monitored for prostate cellular health and age-appropriate screenings." 
                        : selectedPackage.womenSpecial || "CA-125 Ovarian Screen - Included to monitor reproductive pathways, cellular health, and ovarian wellness."}
                    </p>
                  </div>
                )}

                {/* Test Categories and parameters list */}
                <div className="mb-8">
                  <h4 className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Full Test Inclusions ({selectedPackage.testGroups?.length || 0} Key Categories)
                  </h4>
                  <div className="space-y-3.5 max-h-[30vh] overflow-y-auto pr-2 scrollbar-thin">
                    {selectedPackage.testGroups?.map((group, idx) => (
                      <div 
                        key={idx}
                        className="p-3 bg-gray-50 dark:bg-zinc-800/40 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800/60 transition-colors border border-gray-100 dark:border-zinc-800"
                      >
                        <h5 className="text-xs font-black text-gray-900 dark:text-white flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-google-blue" />
                          {group.name}
                        </h5>
                        <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400 font-medium mt-1 pl-3.5">
                          {group.details}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Area */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-extrabold block">Accredited Net price</span>
                    <span className="text-3xl font-black text-gray-900 dark:text-white leading-tight">₹{parseInt(selectedPackage.priceText).toLocaleString()}</span>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedPackage(null)}
                      className="px-5 h-11 border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 text-[13px] font-bold text-gray-700 dark:text-gray-300 rounded-full transition-all cursor-pointer flex items-center justify-center bg-transparent"
                    >
                      Close View
                    </button>
                    <button
                      onClick={() => {
                        const text = `Hi, I would like to book the "${selectedPackage.title}" diagnostic fullbody package (₹${selectedPackage.priceText}) at SRL Diagnostics Mohali. Please confirm available slots.`;
                        window.open(`https://wa.me/919115459115?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
                      }}
                      className="flex-1 sm:flex-initial px-6 h-11 bg-google-blue text-white hover:bg-google-blue/90 text-[13px] font-bold rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" /> Book Appointment
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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
