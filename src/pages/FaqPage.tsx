import React from 'react';
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, MessageSquare, ChevronDown } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { LOCALIZATION } from '../localization';

const FaqPage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    document.title = "FAQ & Patient Support - Agilus Diagnostics (formerly SRL Diagnostics) Mohali";
  }, []);
  
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
