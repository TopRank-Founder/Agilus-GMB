import React from 'react';
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Award, ShieldCheck, Heart } from "lucide-react";
import { LOCALIZATION } from '../localization';

const AboutPage = () => {
  const navigate = useNavigate();

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
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
