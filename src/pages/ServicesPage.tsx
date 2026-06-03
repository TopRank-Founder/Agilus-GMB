import React from 'react';
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
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
  Award
} from "lucide-react";
import { LOCALIZATION } from '../localization';

const ServicesPage = () => {
  const navigate = useNavigate();

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
      {/* Top Header/Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-google-blue dark:text-[#4da9ad] font-bold text-sm bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/80 px-4 py-2.5 rounded-full shadow-sm transition-all inline-flex cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> {LOCALIZATION.ACTIONS.BACK_HOME}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
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
