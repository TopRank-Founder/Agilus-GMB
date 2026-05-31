import React from 'react';
import { motion } from "motion/react";
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { LOCALIZATION } from '../localization';

const FaqPage = () => {
  const navigate = useNavigate();
  
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

  return (
    <div className="min-h-screen bg-white font-sans p-8">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-google-blue mb-8 font-bold">
        <ArrowLeft className="w-5 h-5" /> {LOCALIZATION.ACTIONS.BACK_HOME}
      </button>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black mb-8 text-[#202124]">{LOCALIZATION.FAQ.TITLE}</h1>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div key={i} className="border border-google-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">{faq.q}</h3>
                <p className="text-google-grey">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
